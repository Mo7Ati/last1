<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class orderItems extends Pivot
{
    protected $table = 'order_items';
    public $timestamps = false;
    protected $fillable = [
        'unit_price',
        'quantity',
        'product_data',
        'order_id',
        'product_id'
    ];

    protected $casts = [
        'product_data' => 'array',
        'unit_price' => 'float',
        'quantity' => 'int',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
