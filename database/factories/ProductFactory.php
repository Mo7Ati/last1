<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = $this->faker->randomFloat(2, 5, 500);
        $comparePrice = $this->faker->boolean(40)
            ? $this->faker->randomFloat(2, $price * 1.1, $price * 2)
            : null;

        return [
            'name' => [
                'en' => $this->faker->words(3, true),
                'ar' => $this->faker->words(3, true),
            ],
            'description' => [
                'en' => $this->faker->paragraph(),
                'ar' => $this->faker->paragraph(),
            ],
            'keywords' => $this->faker->words(5),
            'price' => $price,
            'compare_price' => $comparePrice,
            'store_id' => function () {
                // Try to use an existing store first, otherwise create a new one
                $store = Store::inRandomOrder()->first();
                return $store ? $store->id : Store::factory()->create()->id;
            },
            'category_id' => function (array $attributes) {
                $storeId = $attributes['store_id'] ?? Store::inRandomOrder()->first()?->id ?? Store::factory()->create()->id;
                $categories = Category::where('store_id', $storeId)->pluck('id')->toArray();
                return !empty($categories) && $this->faker->boolean(70)
                    ? $this->faker->randomElement($categories)
                    : null;
            },
            'is_active' => $this->faker->boolean(80), // 80% chance of being active
            'is_accepted' => $this->faker->boolean(90), // 90% chance of being accepted
            'quantity' => $this->faker->numberBetween(0, 1000),
        ];
    }

    /**
     * Indicate that the product is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the product is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the product is accepted.
     */
    public function accepted(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_accepted' => true,
        ]);
    }

    /**
     * Indicate that the product is pending acceptance.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_accepted' => false,
        ]);
    }

    /**
     * Indicate that the product is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'quantity' => 0,
        ]);
    }

    /**
     * Indicate that the product has a discount (compare_price).
     */
    public function onSale(): static
    {
        return $this->state(function (array $attributes) {
            $price = $attributes['price'] ?? $this->faker->randomFloat(2, 5, 500);
            return [
                'compare_price' => $this->faker->randomFloat(2, $price * 1.1, $price * 2),
            ];
        });
    }
}

