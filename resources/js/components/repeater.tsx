import React from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RepeaterProps<T> {
    items: T[];
    onChange: (items: T[]) => void;
    onAddItem: () => T;
    renderFields: (item: T, index: number, updateItem: (updates: Partial<T>) => void) => React.ReactNode;
    label?: string;
    addButtonText?: string;
}

export function Repeater<T>({
    items,
    onChange,
    onAddItem,
    renderFields,
    label,
    addButtonText = "Add Item",
}: RepeaterProps<T>) {

    const addItem = () => {
        onChange([...items, onAddItem()]);
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        onChange(newItems);
    };

    const updateItem = (index: number, updates: Partial<T>) => {
        const newItems = items.map((item, i) => i === index ? { ...item, ...updates } : item);
        onChange(newItems);
    };

    return (
        <div className="space-y-4 w-full">
            {label && <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>}

            <div className="flex flex-col gap-3">
                {items.map((item, index) => {
                    // Use a unique key: prefer item.id if it exists, otherwise use index with a stable identifier
                    const itemKey = (item as any).id || (item as any).temp_id || `item-${index}`;
                    return (
                    <Card
                        key={itemKey}
                        className="gap-4 p-4 shadow-sm animate-in fade-in slide-in-from-top-1"
                    >
                        {/* Field Rendering Area */}
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                {renderFields(item, index, (updates) => updateItem(index, updates))}
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(index)}
                                className="text-muted-foreground hover:text-destructive shrink-0"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Remove Action - aligned with first input row (label height ~5 + gap ~1.5 + input start) */}

                    </Card>
                    );
                })}
            </div>

            <Button
                type="button"
                variant="outline"
                className="w-full border-dashed"
                onClick={addItem}
            >
                <Plus className="h-4 w-4 mr-2" />
                {addButtonText}
            </Button>
        </div>
    );
}
