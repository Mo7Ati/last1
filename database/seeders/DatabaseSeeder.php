<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Admin::create([
            'name' => 'Admin',
            'email' => 'admin@ps.com',
            'password' => 'password',
        ]);
    }
}
