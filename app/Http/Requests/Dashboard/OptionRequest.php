<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class OptionRequest extends FormRequest
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
            'name' => ['required', 'array'],
            'name.*' => ['required', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        $attributes = $this->attributes();

        return [
            'name.required' => __('validation.required', ['attribute' => $attributes['name']]),
            'name.array' => __('validation.array', ['attribute' => $attributes['name']]),
            'name.*.required' => __('validation.required', ['attribute' => $attributes['name']]),
            'name.*.string' => __('validation.string', ['attribute' => $attributes['name']]),
            'name.*.max' => __('validation.max', ['attribute' => $attributes['name'], 'max' => 255]),
            'is_active.boolean' => __('validation.boolean', ['attribute' => $attributes['is_active']]),
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => __('validation.attributes.name'),
            'is_active' => __('validation.attributes.is_active'),
        ];
    }
}

