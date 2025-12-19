<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'keywords' => $this->keywords,
            'price' => $this->price,
            'compare_price' => $this->compare_price,
            'store_id' => $this->store_id,
            'category_id' => $this->category_id,
            'is_active' => $this->is_active,
            'is_accepted' => $this->is_accepted,
            'quantity' => $this->quantity,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            'store' => new StoreResource($this->whenLoaded('Store')),
            'category' => $this->whenLoaded('Category', function () {
                return $this->Category ? [
                    'id' => $this->Category->id,
                    'name' => $this->Category->name,
                ] : null;
            }),
        ];
    }
}

