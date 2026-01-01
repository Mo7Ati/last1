<?php

namespace App\Http\Controllers\dashboard\store;


use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreRequest;
use App\Http\Resources\StoreCategoryResource;
use App\Http\Resources\StoreResource;
use App\Models\StoreCategory;
use App\Traits\MediaSyncTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GeneralSettingsController extends Controller
{
    use MediaSyncTrait;

    public function general(Request $request)
    {
        return Inertia::render('store/settings/general-settings', [
            'store' => StoreResource::make(Auth::guard('store')->user())->serializeForForm(),
            'storeCategories' => StoreCategory::all()->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                ];
            }),
        ]);
    }

    public function generalUpdate(StoreRequest $request)
    {
        $data = $request->validated();
        $store = Auth::guard('store')->user();
        $store->update($data);

        $this->syncMedia($request, $store, 'logo');

        return redirect()->back();
    }
}
