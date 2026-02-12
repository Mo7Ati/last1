<?php

namespace App\Http\Resources;

use App\Enums\TransactionTypeEnum;
use App\Models\Order;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'receiver' => $this->whenLoaded('payable', fn($payable) => $this->getReceiverName()),
            'source' => $this->whenLoaded('source', fn($source) => $this->getSourceName()),
            'amount' => $this->formatAmount(),
            'explanation' => TransactionTypeEnum::tryFrom($this->meta['type'])?->label(),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at,
        ];
    }

    private function getReceiverName(): string
    {
        return __('models.' . class_basename($this->payable_type)) . '-' . $this->payable->name;
    }

    private function getSourceName(): string
    {
        return match ($this->source_type) {
            Order::class => __('models.Order') . '-' . $this->source->id,
            Store::class => __('models.Store') . '-' . $this->source->name,
            default => __('models.platform'),
        };
    }

    private function formatAmount(): string
    {
        $sign = $this->type === 'deposit' ? '+' : '-';

        return $sign . number_format($this->amount, 2);
    }
}
