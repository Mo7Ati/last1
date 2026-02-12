<?php

namespace App\Services;

use App\Enums\PaymentStatusEnum;
use App\Enums\TransactionTypeEnum;
use App\Models\Order;
use App\Models\Platform;
use App\Models\Store;
use App\Settings\PaymentsSettings;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionsService
{
    public function __construct(
        protected PaymentsSettings $paymentsSettings
    ) {
    }

    public function handleOrderPaid(Order $order): void
    {
        if ($order->payment_status === PaymentStatusEnum::PAID) {
            return;
        }

        DB::transaction(function () use ($order) {
            // deposit full order total to store wallet
            $this->depositOrderTotalToStoreWallet($order);

            //  Calculate platform share and transfer from store to platform
            $this->transferPlatformFeeToPlatformWallet($order);

            // update order payment status to paid
            $order->update([
                'payment_status' => PaymentStatusEnum::PAID->value,
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
                'type' => TransactionTypeEnum::DEPOSIT_STORE_SUBSCRIPTION_TO_PLATFORM_WALLET->value,
            ];

            if ($subscriptionId !== null) {
                $meta['subscription_id'] = $subscriptionId;
            }

            $transaction = $platform->deposit($amount, $meta);
            $transaction->source()->associate($store);
            $transaction->save();
        });
    }

    /**
     * Deposit the full order total to the store wallet and associate it with the order.
     */
    public function depositOrderTotalToStoreWallet(Order $order): void
    {
        $transaction = $order->store->deposit($order->total, [
            'type' => TransactionTypeEnum::DEPOSIT_ORDER_TOTAL_IN_STORE_WALLET->value,
        ]);

        $transaction->source()->associate($order);
        $transaction->save();
    }

    /**
     * Transfer the platform fee from the store to the platform wallet and associate it with the order.
     */
    public function transferPlatformFeeToPlatformWallet(Order $order): void
    {
        $platform = Platform::query()->first();
        $platformFeeAmount = $this->calculatePlatformFeeAmount($order);


        // this creates a withdrawal on the store wallet and a deposit on the platform wallet
        $store_fee_transaction = $order->store->withdraw($platformFeeAmount, [
            'type' => TransactionTypeEnum::WITHDRAW_PLATFORM_FEE_FROM_STORE_WALLET->value,
        ]);

        $store_fee_transaction->source()->associate($order);
        $store_fee_transaction->save();

        // this creates a deposit on the platform wallet
        $platform_fee_transaction = $platform->deposit($platformFeeAmount, [
            'type' => TransactionTypeEnum::DEPOSIT_PLATFORM_FEE_TO_PLATFORM_WALLET->value,
        ]);

        $platform_fee_transaction->source()->associate($order);
        $platform_fee_transaction->save();
    }

    /**
     * Calculate the platform fee amount for an order.
     */
    public function calculatePlatformFeeAmount(Order $order): float
    {
        return $order->total * $this->paymentsSettings->platform_fee_percentage / 100;
    }
}

