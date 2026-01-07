<?php

namespace App\Http\Resources;

use App\Enums\CooperativeTypeEnum;
use App\Enums\PaymentStatus;
use App\Enums\SectionItemEnum;
use App\Models\Branch;
use App\Models\Cooperative;
use App\Models\Group;
use App\Models\Order;
use App\Models\Product;
use App\Models\Reel;
use App\Models\Store;
use App\Models\StoreCategory;
use Illuminate\Http\Request;
use App\Enums\SectionEnum;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class SectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array_merge([
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'type' => $this->type?->value,
            'data' => $this->serializeSectionData(),
        ]);
    }

    /**
     * Serialize section data based on type
     */
    private function serializeSectionData()
    {
        return match ($this->type?->value) {
                // SectionEnum::MAIN_BANNERS->value => $this->serializeMainBanners(),
            SectionEnum::STORE_CATEGORIES->value => $this->serializeStoreCategories(),
            SectionEnum::PRODUCTS->value => $this->serializeProducts(),
            SectionEnum::STORES->value => $this->serializePopularStores(),
            // SectionEnum::FEATURES->value => $this->serializeFeatures(),

            default => null,
        };
    }

    /**
     * Serialize sections that contain ordered items
     */
    private function serializeMainBanners()
    {
        // $this->data
    }

    private function serializeStoreCategories()
    {
        $storeCategories = StoreCategory::query()
            ->whereIn('id', Arr::get($this->data, 'store_category_ids'))->get();
        return StoreCategoryResource::collection($storeCategories);
    }

    private function serializeProducts()
    {
        $products = Product::query()
            ->whereIn('id', Arr::get($this->data, 'product_ids'))->get();
        return ProductResource::collection($products);
    }
    private function serializeStores()
    {
        $stores = Store::query()
            ->whereIn('id', Arr::get($this->data, 'store_ids'))->get();
        return StoreResource::collection($stores);
    }
    private function serializeFeatures()
    {
        return [
            'title' => Arr::get($this->data, 'title'),
            'description' => Arr::get($this->data, 'description'),
        ];
    }

    public function serializeForForm(): array
    {
        $formData = [
            'id' => $this->id,
            'title' => $this->title ?? [],
            'description' => $this->description ?? [],
            'type' => $this->type?->value,
            'is_active' => $this->is_active ?? true,
            'group_id' => $this->group_id,
            'country_id' => $this->country_id,
        ];

        // Extract data based on section type
        if ($this->data) {
            switch ($this->type?->value) {
                case SectionEnum::STORES->value:
                    $formData['data'] = [
                        'store_ids' => Arr::get($this->data, 'store_ids', []),
                    ];
                    break;

                case SectionEnum::PRODUCTS->value:
                    $formData['data'] = [
                        'product_ids' => Arr::get($this->data, 'product_ids', []),
                    ];
                    break;

                case SectionEnum::STORE_CATEGORIES->value:
                    $formData['data'] = [
                        'store_category_ids' => Arr::get($this->data, 'store_category_ids', []),
                    ];
                    break;

                case SectionEnum::FEATURES->value:
                    $formData['data'] = [
                        'title' => Arr::get($this->data, 'title', []),
                        'description' => Arr::get($this->data, 'description', []),
                    ];
                    break;

                default:
                    $formData['data'] = $this->data ?? [];
                    break;
            }
        } else {
            $formData['data'] = [];
        }

        return $formData;
    }
}
