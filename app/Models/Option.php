<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Option extends Model
{
    use HasTranslations;

    protected $fillable = [
        'name',
        'store_id',
        'is_active',
    ];

    protected $casts = [
        'name' => 'array',
        'is_active' => 'boolean',
    ];

    public array $translatable = ['name'];

    
    protected static function booted()
    {
        static::creating(function ($model) {
            $model->store_id = auth()->guard('store')->id();
        });
    }
    public function store()
    {
        return $this->belongsTo(Store::class);
    }
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_options', 'option_id', 'product_id');
    }
}
