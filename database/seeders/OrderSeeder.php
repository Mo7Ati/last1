<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Platform;
use App\Models\Store;
use App\Models\StoreCategory;
use App\Services\TransactionsService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class OrderSeeder extends Seeder
{
    /**
     * Seed orders spread over the last 90 days and generate transactions
     * for a subset of paid orders (via TransactionsService::handleOrderPaid).
     */
    public function run(): void
    {
        $this->ensurePrerequisites();

        $orderCount = 120;
        $paidRatio = 0.70; // 70% of orders will be marked paid and get transactions

        $this->command->info('Creating orders over the last 90 days...');

        for ($i = 0; $i < $orderCount; $i++) {
            $createdAt = now()->subDays(rand(0, 89))->subSeconds(rand(0, 86400));
            Order::factory()->create([
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
                'payment_status' => 'unpaid', // we'll mark some as paid via handleOrderPaid
            ]);
        }

        $this->command->info("Created {$orderCount} orders.");

        $transactionsService = app(TransactionsService::class);
        $toMarkPaid = (int) ceil($orderCount * $paidRatio);
        $unpaidOrders = Order::where('payment_status', 'unpaid')->inRandomOrder()->limit($toMarkPaid)->get();

        $this->command->info("Processing {$unpaidOrders->count()} orders as paid (creating wallet transactions)...");

        foreach ($unpaidOrders as $order) {
            try {
                $transactionsService->handleOrderPaid($order);
            } catch (\Throwable $e) {
                $this->command->warn("Failed to process order {$order->id}: {$e->getMessage()}");
            }
        }

        $this->command->info('Orders and transactions seeded successfully.');
        $this->command->info('  Orders: ' . Order::count());
        $this->command->info('  Paid orders: ' . Order::where('payment_status', 'paid')->count());
        $this->command->info('  Transactions: ' . \App\Models\Transaction::count());
    }

    /**
     * Ensure Platform, stores, customers and addresses exist.
     */
    private function ensurePrerequisites(): void
    {
        Platform::firstOrCreate(
            ['id' => 1],
            ['name' => 'Platform']
        );

        if (Store::count() === 0) {
            $this->command->info('No stores found. Creating store category and stores...');
            $category = StoreCategory::first() ?? StoreCategory::factory()->create();
            Store::factory()->count(8)->create(['category_id' => $category->id]);
        }

        if (Customer::count() < 15) {
            $this->command->info('Creating customers and addresses...');
            $existing = Customer::count();
            for ($i = $existing; $i < 15; $i++) {
                $customer = Customer::create([
                    'name' => fake()->name(),
                    'email' => fake()->unique()->safeEmail(),
                    'phone_number' => fake()->phoneNumber(),
                    'password' => Hash::make('password'),
                    'is_active' => true,
                ]);
                $this->createAddressForCustomer($customer);
                if (fake()->boolean(50)) {
                    $this->createAddressForCustomer($customer);
                }
            }
        }
    }

    private function createAddressForCustomer(Customer $customer): void
    {
        $location = [
            'lat' => fake()->latitude(),
            'lng' => fake()->longitude(),
            'address' => fake()->streetAddress(),
            'city' => fake()->city(),
            'state' => fake()->state(),
            'zip' => fake()->postcode(),
            'country' => fake()->country(),
        ];

        Address::create([
            'name' => fake()->name(),
            'customer_id' => $customer->id,
            'location' => $location,
        ]);
    }
}
