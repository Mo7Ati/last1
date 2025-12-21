import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface RepeaterItem {
    id?: string | number
    [key: string]: any
}

interface RepeaterProps {
    name: string
    label?: string
    items: RepeaterItem[]
    onItemsChange?: (items: RepeaterItem[]) => void
    children: (item: RepeaterItem, index: number, remove: () => void) => React.ReactNode
    addButtonLabel?: string
    emptyStateLabel?: string
    className?: string
    error?: string
    minItems?: number
    maxItems?: number
}

export default function Repeater({
    name,
    label,
    items: initialItems,
    onItemsChange,
    children,
    addButtonLabel = 'Add Item',
    emptyStateLabel = 'No items added yet',
    className,
    error,
    minItems = 0,
    maxItems,
}: RepeaterProps) {
    const [items, setItems] = useState<RepeaterItem[]>(initialItems)

    const addItem = () => {
        if (maxItems && items.length >= maxItems) {
            return
        }
        const newItem: RepeaterItem = { id: `temp-${Date.now()}-${Math.random()}` }
        const updatedItems = [...items, newItem]
        setItems(updatedItems)
        onItemsChange?.(updatedItems)
    }

    const removeItem = (index: number) => {
        if (items.length <= minItems) {
            return
        }
        const newItems = items.filter((_, i) => i !== index)
        setItems(newItems)
        onItemsChange?.(newItems)
    }

    return (
        <div className={cn('space-y-4', className)}>
            {label && (
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                    {maxItems && (
                        <span className="text-xs text-muted-foreground">
                            {items.length} / {maxItems}
                        </span>
                    )}
                </div>
            )}

            <div className="space-y-3">
                {items.length > 0 && (
                    items.map((item, index) => (
                        <Card key={item.id || index} className="relative">
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-4">
                                        {children(item, index, () => removeItem(index))}
                                    </div>
                                    {items.length > minItems && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                                            onClick={() => removeItem(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Remove item</span>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {(!maxItems || items.length < maxItems) && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={addItem}
                    className="w-full"
                >
                    <Plus className="h-4 w-4" />
                    {addButtonLabel}
                </Button>
            )}

            {error && (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}

