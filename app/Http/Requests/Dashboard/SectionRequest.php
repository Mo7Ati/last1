<?php

namespace App\Http\Requests\Dashboard;

use App\Enums\SectionEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'array'],
            'title.*' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'array'],
            'description.*' => ['nullable', 'string'],
            'type' => ['required', Rule::enum(SectionEnum::class)],
            'data' => ['nullable', 'array'],
            'is_active' => ['nullable', 'boolean'],
            'group_id' => ['nullable', 'integer', 'exists:groups,id'],
            'country_id' => ['nullable', 'integer', 'exists:countries,id'],
        ];
    }

    public function messages(): array
    {
        $attributes = $this->attributes();

        return [
            'title.required' => __('validation.required', ['attribute' => $attributes['title']]),
            'title.array' => __('validation.array', ['attribute' => $attributes['title']]),
            'title.*.required' => __('validation.required', ['attribute' => $attributes['title']]),
            'title.*.string' => __('validation.string', ['attribute' => $attributes['title']]),
            'title.*.max' => __('validation.max', ['attribute' => $attributes['title'], 'max' => 255]),

            'description.array' => __('validation.array', ['attribute' => $attributes['description']]),
            'description.*.string' => __('validation.string', ['attribute' => $attributes['description']]),

            'type.required' => __('validation.required', ['attribute' => $attributes['type']]),
            'type.enum' => __('validation.enum', ['attribute' => $attributes['type']]),

            'data.array' => __('validation.array', ['attribute' => $attributes['data']]),

            'is_active.boolean' => __('validation.boolean', ['attribute' => $attributes['is_active']]),

            'group_id.integer' => __('validation.integer', ['attribute' => $attributes['group_id']]),
            'group_id.exists' => __('validation.exists', ['attribute' => $attributes['group_id']]),

            'country_id.integer' => __('validation.integer', ['attribute' => $attributes['country_id']]),
            'country_id.exists' => __('validation.exists', ['attribute' => $attributes['country_id']]),
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => __('validation.attributes.title'),
            'description' => __('validation.attributes.description'),
            'type' => __('validation.attributes.type'),
            'data' => __('validation.attributes.data'),
            'is_active' => __('validation.attributes.is_active'),
            'group_id' => __('validation.attributes.group_id'),
            'country_id' => __('validation.attributes.country_id'),
        ];
    }
}
