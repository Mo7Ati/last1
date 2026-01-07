<?php

namespace App\Http\Controllers\dashboard\admin;

use App\Enums\PermissionsEnum;
use App\Enums\SectionEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\SectionRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SectionResource;
use App\Http\Resources\StoreCategoryResource;
use App\Http\Resources\StoreResource;
use App\Models\Product;
use App\Models\Section;
use App\Models\Store;
use App\Models\StoreCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectionController extends Controller
{
    public function index(Request $request)
    {
        // abort_unless($request->user('admin')->can(PermissionsEnum::SECTIONS_INDEX->value), 403);

        $sections = Section::query()
            ->search($request->get('tableSearch'))
            ->when($request->get('is_active') !== null, function ($query) use ($request) {
                $query->where('is_active', $request->get('is_active'));
            })
            ->when($request->get('type'), function ($query) use ($request) {
                $query->where('type', $request->get('type'));
            })
            ->ordered()
            ->orderBy($request->get('sort', 'id'), $request->get('direction', 'desc'))
            ->paginate($request->get('per_page', 10))
            ->withQueryString();

        return Inertia::render('admin/sections/index', [
            'sections' => SectionResource::collection($sections),
            'sectionTypes' => SectionEnum::getOptions(),
        ]);
    }

    public function create()
    {
        // abort_unless(request()->user('admin')->can(PermissionsEnum::SECTIONS_CREATE->value), 403);

        return Inertia::render('admin/sections/create', [
            'section' => SectionResource::make(new Section())->serializeForForm(),
            'sectionTypes' => SectionEnum::getOptions(),
            'stores' => StoreResource::collection(Store::all()),
            'products' => ProductResource::collection(Product::all()),
            'storeCategories' => StoreCategoryResource::collection(StoreCategory::all()),
        ]);
    }

    public function store(SectionRequest $request)
    {
        // abort_unless($request->user('admin')->can(PermissionsEnum::SECTIONS_CREATE->value), 403);
        // dd($request->all());
        Section::create($request->validated());
        return to_route('admin.sections.index')->with('success', __('messages.created_successfully'));
    }

    public function edit($id)
    {
        // abort_unless(request()->user('admin')->can(PermissionsEnum::SECTIONS_UPDATE->value), 403);

        $section = Section::with('items')->findOrFail($id);
        return Inertia::render('admin/sections/edit', [
            'section' => SectionResource::make($section)->serializeForForm(),
            'sectionTypes' => SectionEnum::getOptions(),
            'stores' => StoreResource::collection(Store::all()),
            'products' => ProductResource::collection(Product::all()),
            'storeCategories' => StoreCategoryResource::collection(StoreCategory::all()),
        ]);
    }

    public function update($id, SectionRequest $request)
    {
        // abort_unless($request->user('admin')->can(PermissionsEnum::SECTIONS_UPDATE->value), 403);

        $section = Section::findOrFail($id);
        $section->update($request->validated());

        return redirect()
            ->route('admin.sections.index')
            ->with('success', __('messages.updated_successfully'));
    }

    public function destroy($id)
    {
        // abort_unless(request()->user('admin')->can(PermissionsEnum::SECTIONS_DESTROY->value), 403);

        Section::destroy($id);

        return redirect()
            ->route('admin.sections.index')
            ->with('success', __('messages.deleted_successfully'));
    }
}
