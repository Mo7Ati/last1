<?php

namespace App\Services;

use App\Enums\PaymentStatusEnum;
use App\Enums\TransactionTypeEnum;
use App\Models\Order;
use App\Models\Platform;
use App\Models\Store;
use App\Settings\PaymentsSettings;
use Bavix\Wallet\Interfaces\Wallet;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionsService
{
    public function __construct(
        protected PaymentsSettings $paymentsSettings
    ) {
    }

    /**
     * Handle a paid order: split total between store and platform wallets.
     *
     * Assumes the Stripe payment for this order has already succeeded.
     */
    public function handleOrderPaid(Order $order): void
    {
        if ($order->payment_status === PaymentStatusEnum::PAID) {
            Log::info('TransactionsService: handleOrderPaid called for already paid order, skipping', [
                'order_id' => $order->id,
                'payment_status' => $order->payment_status,
            ]);

            return;
        }

        DB::transaction(function () use ($order) {
            /** @var Store $store */
            $store = $order->store;
            if (!$store instanceof Store) {
                Log::warning('TransactionsService: no store relation found for order, aborting handleOrderPaid', [
                    'order_id' => $order->id,
                    'store_id' => $order->store_id,
                ]);

                return;
            }

            $platform = Platform::query()->first();
            if (!$platform instanceof Platform) {
                Log::warning('TransactionsService: no platform record found, aborting handleOrderPaid', [
                    'order_id' => $order->id,
                ]);

                return;
            }

            // 1) Deposit full order total to the store wallet
            $orderTotal = (float) $order->total;
            Log::info('TransactionsService: depositing full order total to store wallet', [
                'order_id' => $order->id,
                'store_id' => $order->store_id,
                'order_total' => $orderTotal,
            ]);

            $this->depositToWallet(
                $store->wallet,
                $orderTotal,
                TransactionTypeEnum::ORDER_STORE_SHARE,
                [
                    'order_id' => $order->id,
                    'store_id' => $order->store_id,
                ]
            );

            // 2) Calculate platform share and transfer from store to platform
            $platformFeePercentage = 8; //(float) $this->paymentsSettings->platform_fee_percentage;
            $platformFeeAmount = $orderTotal * $platformFeePercentage / 100;

            Log::info('TransactionsService: calculated platform share', [
                'order_id' => $order->id,
                'platform_fee_percentage' => $platformFeePercentage,
                'platform_fee_amount' => $platformFeeAmount,
            ]);

            if ($platformFeeAmount > 0) {
                $meta = [
                    'order_id' => $order->id,
                    'store_id' => $order->store_id,
                    'type' => TransactionTypeEnum::ORDER_PLATFORM_FEE->value,
                ];

                // This creates withdrawal on store wallet and deposit on platform wallet,
                // both tagged with PLATFORM_SHARE in meta['type'].
                Log::info('TransactionsService: transferring platform share from store to platform', [
                    'order_id' => $order->id,
                    'store_id' => $order->store_id,
                    'platform_id' => $platform->id,
                    'amount' => $platformFeeAmount,
                ]);

                $transfer = $store->transfer($platform->wallet, $platformFeeAmount, $meta);
                Log::info('TransactionsService: transfer created from store to platform', [
                    'transfer' => $transfer,
                ]);
            }

            $order->update([
                'payment_status' => PaymentStatusEnum::PAID->value,
            ]);

            Log::info('TransactionsService: handleOrderPaid completed', [
                'order_id' => $order->id,
                'payment_status' => $order->payment_status,
            ]);
        });
    }

    /**
     * Handle a successful store subscription payment: deposit full amount to platform wallet.
     */
    public function handleStoreSubscriptionPaid(Store $store, float $amount, ?string $subscriptionId = null): void
    {
        $platform = Platform::query()->first();
        if (!$platform instanceof Platform) {
            return;
        }

        DB::transaction(function () use ($store, $amount, $subscriptionId, $platform) {
            $meta = [
                'store_id' => $store->id,
                'type' => TransactionTypeEnum::STORE_SUBSCRIPTION->value,
            ];

            if ($subscriptionId !== null) {
                $meta['subscription_id'] = $subscriptionId;
            }

            $this->depositToWallet(
                $platform->wallet,
                $amount,
                TransactionTypeEnum::STORE_SUBSCRIPTION,
                $meta
            );
        });
    }

    /**
     * Helper to deposit to a wallet with unified meta, including enum type.
     */
    protected function depositToWallet(Wallet $wallet, float $amount, TransactionTypeEnum $type, array $meta = []): void
    {
        if ($amount <= 0) {
            return;
        }

        $baseMeta = [
            'type' => $type->value,
        ];

        $wallet->deposit($amount, array_merge($baseMeta, $meta));
    }
}

