import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import MultiInput from './multi-input'
import { Locale } from '@/types/dashboard'

type FieldType = 'input' | 'textarea' | 'multi-input'

interface FieldConfig {
    key: string
    label: string
    type: FieldType
    value: Record<Locale, string>
}

interface TranslatableFieldsCardProps {
    title: string
    fields: FieldConfig[]
}

const locales: { key: Locale; label: string; }[] = [
    { key: 'en', label: 'English' },
    { key: 'ar', label: 'العربية' },
]

export default function TranslatableFieldsCard({
    title,
    fields,
}: TranslatableFieldsCardProps) {
    const [values, setValues] = useState<Record<string, Record<Locale, string>>>(() => {

        const initial: Record<string, Record<Locale, string>> = {}

        fields.forEach(field => {
            initial[field.key] = {
                en: field.value?.en ?? '',
                ar: field.value?.ar ?? '',
            }
        })

        return initial
    })

    return (
        <div className="rounded-xl border bg-background shadow-sm">
            {/* Header */}
            <div className="border-b px-4 py-3 font-medium">
                {title}
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                {fields.map(field =>
                    locales.map(locale => (
                        <input
                            key={`${field.key}-${locale.key}`}
                            type="hidden"
                            name={`${field.key}[${locale.key}]`}
                            value={values[field.key][locale.key]}
                        />
                    ))
                )}

                <Tabs defaultValue="en">
                    <TabsList>
                        {locales.map(locale => (
                            <TabsTrigger key={locale.key} value={locale.key}>
                                {locale.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {locales.map(locale => (
                        <TabsContent key={locale.key} value={locale.key}>
                            <div className="space-y-4">
                                {fields.map(field => {
                                    const fieldValue = values[field.key][locale.key]

                                    const updateValue = (v: string) =>
                                        setValues(prev => ({
                                            ...prev,
                                            [field.key]: {
                                                ...prev[field.key],
                                                [locale.key]: v,
                                            },
                                        }))

                                    return (
                                        <div key={field.key} className="space-y-1">
                                            <Label>{field.label}</Label>

                                            {field.type === 'input' && (
                                                <Input
                                                    value={fieldValue}
                                                    onChange={e =>
                                                        updateValue(e.target.value)
                                                    }
                                                />
                                            )}

                                            {field.type === 'textarea' && (
                                                <Textarea
                                                    value={fieldValue}
                                                    onChange={e =>
                                                        updateValue(e.target.value)
                                                    }
                                                />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}
