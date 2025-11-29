<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;

class Product extends Model implements HasMedia
{
    use HasFactory, HasTranslations, InteractsWithMedia;

    protected $fillable = [
        'name',
        'description',
        'keywords',
        'price',
        'compare_price',
        'store_id',
        'category_id',
        'is_active',
        'is_accepted',
        'quantity',
    ];

    protected $casts = [
        'name' => 'array',
        'address' => 'array',
        'keywords' => 'array',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->uuid = (string) Str::uuid();
            $model->store_id = auth()->guard('store')->id();
        });
    }

    public array $translatable = ['name', 'description', 'keywords'];


    public function Store()
    {
        return $this->belongsTo(Store::class, 'store_id', 'id');
    }

    public function Category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id')
            ->withDefault(['name' => 'No Category']);
    }

    public function Cart()
    {
        return $this->hasMany(Cart::class, 'product_id', 'id');
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_items', 'product_id', 'order_id');
    }

    public function additions()
    {
        return $this->belongsToMany(Addition::class, 'product_additions', 'product_id', 'addition_id')
            ->withPivot('price');
    }

    public function options()
    {
        return $this->belongsToMany(Option::class, 'product_options', 'product_id', 'option_id')
            ->withPivot('price');
    }
}
