import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import InputError from '../input-error'
import { cn } from '@/lib/utils'

interface FormInputProps {
    defaultValue?: any
    error?: any
    label: string
    name: string
    type: string
    required: boolean
    placeholder: string
    hint?: string
    className?: string
    minLength?: number
    maxLength?: number
}

const FormInput = (
    {
        defaultValue,
        error,
        label,
        name,
        type,
        required,
        placeholder,
        hint,
        className,
        minLength,
        maxLength,
    }: FormInputProps) => {
    return (
        <div className={cn('space-y-2', className)}>
            <Label htmlFor={name}>
                {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Input
                minLength={minLength}
                maxLength={maxLength}
                id={name}
                name={name}
                type={type}
                required={required}
                defaultValue={defaultValue ?? ''}
                placeholder={placeholder ?? ''}
                aria-invalid={error ? 'true' : 'false'}
            />
            <span className="text-muted-foreground text-xs">{hint}</span>
            <InputError message={error} />
        </div>
    )
}

export default FormInput
