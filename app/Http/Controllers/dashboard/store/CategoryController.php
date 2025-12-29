<?php

namespace App\Http\Controllers\dashboard\store;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $store = $request->user('store');

        $categories = Category::query()
            ->where('store_id', $store->id)
            ->when($request->get('is_active') !== null, function ($query) use ($request) {
                $query->where('is_active', $request->get('is_active'));
            })
            ->orderBy($request->get('sort', 'id'), $request->get('direction', 'desc'))
            ->paginate($request->get('per_page', 10))
            ->withQueryString();

        return Inertia::render('store/categories/index', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }
    public function create(Request $request)
    {
        return Inertia::render('store/categories/create', [
            'category' => CategoryResource::make(new Category())->serializeForForm(),
        ]);
    }

    public function store(Request $request)
    {
        $store = $request->user('store');

        $validated = $request->validated();
        $validated['store_id'] = $store->id;

        Category::create($validated);

        return redirect()
            ->route('store.categories.index')
            ->with('success', __('messages.created_successfully'));
    }

    public function edit(Request $request, int $id)
    {
        $store = $request->user('store');
        $category = Category::query()
            ->where('store_id', $store->id)
            ->findOrFail($id);
        return Inertia::render('store/categories/edit', [
            'category' => CategoryResource::make($category)->serializeForForm(),
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $store = $request->user('store');
        $validated = $request->validated();
        $category->update($validated);
        return redirect()
            ->route('store.categories.index')
            ->with('success', __('messages.updated_successfully'));
    }

    public function destroy(Request $request, int $id)
    {
        $store = $request->user('store');
        $category = Category::query()
            ->where('store_id', $store->id)
            ->findOrFail($id);
        $category->delete();
        return redirect()
            ->route('store.categories.index')
            ->with('success', __('messages.deleted_successfully'));
    }
}

