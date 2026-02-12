<?php

namespace App\Http\Resources;

use App\Models\Platform;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WalletResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'holder' => __('models.' . class_basename($this->holder_type)) . '-' . $this->holder->name,
            'balance' => $this->balance,
            'name' => $this->name,
            'slug' => $this->slug,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
