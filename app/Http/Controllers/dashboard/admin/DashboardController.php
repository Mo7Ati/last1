<?php

namespace App\Http\Controllers\dashboard\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $stats = [
            'orders_count' => Order::count(),
            'customers_count' => Customer::count(),
            'products_count' => Product::count(),
            'total_revenue' => Order::sum('total'),
            'stores_count' => Store::count(),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
        ]);
    }
}

