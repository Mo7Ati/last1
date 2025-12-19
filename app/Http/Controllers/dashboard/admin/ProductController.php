<?php

namespace App\Http\Controllers\dashboard\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()
            ->with(['Store', 'Category'])
            ->search($request->get('tableSearch'))
            ->when($request->get('is_active'), function ($query) use ($request) {
                $query->where('is_active', $request->get('is_active'));
            })
            ->when($request->get('is_accepted'), function ($query) use ($request) {
                $query->where('is_accepted', $request->get('is_accepted'));
            })
            ->when($request->get('store_id'), function ($query) use ($request) {
                $query->where('store_id', $request->get('store_id'));
            })
            ->orderBy($request->get('sort', 'id'), $request->get('direction', 'desc'))
            ->paginate($request->get('per_page', 10))
            ->withQueryString();

        return Inertia::render('admin/products/index', [
            'products' => ProductResource::collection($products),
        ]);
    }
}

