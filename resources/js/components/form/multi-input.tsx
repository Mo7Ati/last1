import React, { useState, useRef, KeyboardEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import InputError from '@/components/input-error'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MultiInputProps {
    name: string
    label?: string
    placeholder?: string
    defaultValue?: string[]
    value?: string[]
    onChange?: (value: string[]) => void
    required?: boolean
    minItems?: number
    maxItems?: number
    hint?: string
    error?: string
    className?: string
    disabled?: boolean
}

export default function MultiInput({
    name,
    label,
    placeholder = 'Type and press Enter to add...',
    defaultValue = [],
    value: controlledValue,
    onChange: controlledOnChange,
    required = false,
    minItems,
    maxItems,
    hint,
    error,
    className,
    disabled = false,
}: MultiInputProps) {
    // Filter out empty strings from defaultValue
    const filteredDefaultValue = defaultValue.filter(tag => tag.trim() !== '')
    const [internalValue, setInternalValue] = useState<string[]>(filteredDefaultValue)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const isControlled = controlledValue !== undefined
    // Filter out empty strings from controlled value as well
    const tags = isControlled
        ? (controlledValue || []).filter(tag => tag.trim() !== '')
        : internalValue

    const updateTags = (newTags: string[]) => {
        if (isControlled) {
            controlledOnChange?.(newTags)
        } else {
            setInternalValue(newTags)
        }
    }

    const addTag = (tag: string) => {
        const trimmedTag = tag.trim()

        if (!trimmedTag) return

        // Check if tag already exists
        if (tags.includes(trimmedTag)) {
            setInputValue('')
            return
        }

        // Check maxItems limit
        if (maxItems && tags.length >= maxItems) {
            setInputValue('')
            return
        }

        updateTags([...tags, trimmedTag])
        setInputValue('')
    }

    const removeTag = (indexToRemove: number) => {
        if (disabled) return

        const newTags = tags.filter((_, index) => index !== indexToRemove)
        updateTags(newTags)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return

        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            if (inputValue.trim()) {
                addTag(inputValue)
            }
        } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            // Remove last tag when backspace is pressed on empty input
            removeTag(tags.length - 1)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        // Prevent adding comma if it would exceed maxItems
        if (value.includes(',') && maxItems && tags.length >= maxItems) {
            return
        }

        // Split by comma and add tags
        if (value.includes(',')) {
            const parts = value.split(',').map(part => part.trim()).filter(part => part)
            parts.forEach(part => {
                if (part && (!maxItems || tags.length < maxItems) && !tags.includes(part)) {
                    updateTags([...tags, part])
                }
            })
            setInputValue('')
        } else {
            setInputValue(value)
        }
    }

    // Create hidden input for form submission (comma-separated values)
    const hiddenValue = tags.join(',')

    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <Label htmlFor={name}>
                    {label} {required && <span className="text-destructive">*</span>}
                </Label>
            )}

            <div className="space-y-2">
                {/* Tags display */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-2 min-h-[2.5rem] border border-input rounded-md bg-background">
                        {tags.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="flex items-center gap-1 pr-1"
                            >
                                <span>{tag}</span>
                                {!disabled && (
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer hover:bg-muted p-0.5 transition-colors"
                                        aria-label={`Remove ${tag}`}
                                    >
                                        <XIcon className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                )}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Input field */}
                <div className="relative">
                    <Input
                        ref={inputRef}
                        id={name}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={disabled || (maxItems ? tags.length >= maxItems : false)}
                        aria-invalid={error ? 'true' : 'false'}
                        className={cn(
                            tags.length > 0 && 'mt-2'
                        )}
                    />
                    {/* Hidden input for form submission */}
                    <input
                        type="hidden"
                        name={name}
                        value={hiddenValue}
                        required={required && tags.length < (minItems || 1)}
                    />
                </div>
            </div>

            {hint && (
                <span className="text-muted-foreground text-xs">{hint}</span>
            )}

            <InputError message={error} />
        </div>
    )
}

