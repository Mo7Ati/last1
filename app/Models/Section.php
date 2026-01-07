<?php

namespace App\Models;

use App\Enums\SectionEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Section extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'type',
        // 'group_id',
        // 'country_id',
        'data',
        'is_active',
        'ordered',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'data' => 'array',
        'is_active' => 'boolean',
        'type' => SectionEnum::class,
    ];


    public $translatable = ['title', 'description'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->ordered = Section::max('ordered') + 1;
        });
    }

    /**
     * Get the group that owns the section.
     */
    // public function group()
    // {
    //     return $this->belongsTo(Group::class);
    // }

    /**
     * Get the country that owns the section.
     */
    // public function country()
    // {
    //     return $this->belongsTo(Country::class);
    // }

    /**
     * Get the section items that belong to this section.
     */
    public function items()
    {
        return $this->hasMany(SectionItem::class);
    }

    /**
     * Scope a query to only include sections for a specific country.
     */
    public function scopeForCountry($query, $countryId)
    {
        return $query->where('country_id', $countryId);
    }

    /**
     * Scope a query to only include sections for a specific group.
     */
    public function scopeForGroup($query, $groupId)
    {
        return $query->where('group_id', $groupId);
    }

    /**
     * Scope a query to only include sections without a group.
     */
    public function scopeWithoutGroup($query)
    {
        return $query->whereNull('group_id');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('ordered');
    }

    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereJsonContains('title', $search)
                    ->orWhereJsonContains('description', $search)
                    ->orWhereRaw('JSON_SEARCH(title, "one", ?) IS NOT NULL', ["%{$search}%"])
                    ->orWhereRaw('JSON_SEARCH(description, "one", ?) IS NOT NULL', ["%{$search}%"]);
            });
        });
    }
}
