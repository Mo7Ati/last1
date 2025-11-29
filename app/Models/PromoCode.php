<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    protected $fillable = [
        'code',
        'name',
        'description',
        'discount_type',
        'discount_value',
        'usage_limit',
        'used_count',
        'valid_from',
        'valid_until',
        'is_active',
    ];

    protected $casts = [
        'name' => 'array',
        'description' => 'array',
        'discount_type' => 'string',
        'discount_value' => 'float',
        'usage_limit' => 'int',
        'used_count' => 'int',
        'valid_from' => 'date',
        'valid_until' => 'date',
        'is_active' => 'boolean',
    ];

    public array $translatable = ['name', 'description'];

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'promo_code_usages', 'promo_code_id', 'order_id');
    }
}
