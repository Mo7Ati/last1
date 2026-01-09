<?php

namespace Database\Factories;

use App\Models\Store;
use App\Models\StoreCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Store>
 */
class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => [
                'en' => $this->faker->company(),
                'ar' => $this->faker->company(),
            ],
            'address' => [
                'en' => $this->faker->address(),
                'ar' => $this->faker->address(),
            ],
            'description' => [
                'en' => $this->faker->paragraph(),
                'ar' => $this->faker->paragraph(),
            ],
            'keywords' => $this->faker->words(5),
            'social_media' => [
                'facebook' => $this->faker->url(),
                'instagram' => $this->faker->url(),
                'twitter' => $this->faker->url(),
            ],
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->unique()->phoneNumber(),
            'password' => 'password',
            'category_id' => function () {
                $categories = StoreCategory::pluck('id')->toArray();
                return !empty($categories) && $this->faker->boolean(70)
                    ? $this->faker->randomElement($categories)
                    : null;
            },
            'delivery_time' => $this->faker->numberBetween(15, 120), // minutes
            'delivery_area_polygon' => null,
            'is_active' => $this->faker->boolean(80), // 80% chance of being active
        ];
    }
}

