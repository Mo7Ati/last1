<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;
class Category extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, HasTranslations;
    protected $fillable = [
        'name',
        'store_id',
        'description',
        'is_active',
    ];


    protected $casts = [
        'name' => 'array',
        'description' => 'array',
    ];

    public array $translatable = ['name', 'description'];

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->store_id = auth()->guard('store')->id();
        });
    }
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }

    public function scopeApplyFilters(Builder $query, array $filters)
    {
        return $query
            ->when(
                isset($filters['is_active']),
                fn($q) => $q->where('is_active', $filters['is_active'])
            )
            ->when(
                isset($filters['tableSearch']),
                fn($q) => $q->search($filters['tableSearch'])
            )
            ->orderBy($filters['sort'] ?? 'id', $filters['direction'] ?? 'desc');
    }

    public function scopeSearch($query, $search)
    {
        return $query->where('name', 'LIKE', "%{$search}%")
            ->orWhere('description', 'LIKE', "%{$search}%");
    }
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
