import { Form, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Section, Store, Product, StoreCategory } from '@/types/dashboard'
import FormButtons from '@/components/form/form-buttons'
import { normalizeFieldValue } from '@/lib/utils'
import TranslatableTabs from '@/components/form/translatable-tabs'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'
import IsActiveFormField from '@/components/form/is-active'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { MultiSelect } from '@/components/ui/multi-select'
import sections from '@/routes/admin/sections'

interface SectionFormProps {
    section: Section
    sectionTypes: Record<string, string>
    stores?: Store[]
    products?: Product[]
    storeCategories?: StoreCategory[]
    type: 'create' | 'edit'
}

export default function SectionForm({
    section,
    sectionTypes,
    stores = [],
    products = [],
    storeCategories = [],
    type
}: SectionFormProps) {
    const { t } = useTranslation('forms')
    const [selectedType, setSelectedType] = useState<string>(section.type || '')
    const [selectedStores, setSelectedStores] = useState<(string | number)[]>([])
    const [selectedProducts, setSelectedProducts] = useState<(string | number)[]>([])
    const [selectedStoreCategories, setSelectedStoreCategories] = useState<(string | number)[]>([])
    const [featureTitle, setFeatureTitle] = useState<Record<string, string>>({ en: '', ar: '' })
    const [featureDescription, setFeatureDescription] = useState<Record<string, string>>({ en: '', ar: '' })

    // Initialize form data from section
    useEffect(() => {
        if (section.data) {
            if (selectedType === 'stores' && section.data.store_ids) {
                setSelectedStores(section.data.store_ids.map((id: string | number) => String(id)))
            } else if (selectedType === 'products' && section.data.product_ids) {
                setSelectedProducts(section.data.product_ids.map((id: string | number) => String(id)))
            } else if (selectedType === 'store_categories' && section.data.store_category_ids) {
                setSelectedStoreCategories(section.data.store_category_ids.map((id: string | number) => String(id)))
            } else if (selectedType === 'features') {
                setFeatureTitle(normalizeFieldValue(section.data.title))
                setFeatureDescription(normalizeFieldValue(section.data.description))
            }
        }
    }, [section.data, selectedType])

    const storeOptions = stores.map((store: Store) => ({
        label: typeof store.name === 'string' ? store.name : (store.name?.en || store.name?.ar || ''),
        value: String(store.id),
    }))

    const productOptions = products.map((product: Product) => ({
        label: typeof product.name === 'string' ? product.name : (product.name?.en || product.name?.ar || ''),
        value: String(product.id),
    }))

    const storeCategoryOptions = storeCategories.map((category: StoreCategory) => ({
        label: typeof category.name === 'string' ? category.name : (category.name?.en || category.name?.ar || ''),
        value: String(category.id),
    }))

    return (
        <Form
            method={type === 'edit' ? 'put' : 'post'}
            action={
                (type === 'edit' && section.id)
                    ? sections.update.url({ section: section.id })
                    : sections.store.url()
            }
        >
            {({ processing, errors }) => (
                <>
                    <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
                        {/* Left column – main translatable fields */}
                        <div className="lg:col-span-2 space-y-6">
                            <TranslatableTabs
                                fields={[
                                    {
                                        name: 'title',
                                        label: t('sections.title'),
                                        type: 'text',
                                        value: normalizeFieldValue(section.title),
                                        placeholder: t('sections.enter_title'),
                                    },
                                    {
                                        name: 'description',
                                        label: t('sections.description'),
                                        type: 'textarea',
                                        value: normalizeFieldValue(section.description),
                                    },
                                ]}
                                errors={errors}
                            />

                            {/* Section Type Selector */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('sections.section_type')}</CardTitle>
                                    <CardDescription>
                                        {t('sections.select_section_type')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <Label htmlFor="type">{t('sections.type')}</Label>
                                        <Select
                                            defaultValue={selectedType}
                                            name="type"
                                            required
                                            onValueChange={(value) => {
                                                setSelectedType(value)
                                                // Reset selections when type changes
                                                setSelectedStores([])
                                                setSelectedProducts([])
                                                setSelectedStoreCategories([])
                                                setFeatureTitle({ en: '', ar: '' })
                                                setFeatureDescription({ en: '', ar: '' })
                                            }}
                                        >
                                            <SelectTrigger id="type" aria-invalid={errors.type ? 'true' : 'false'}>
                                                <SelectValue placeholder={t('sections.select_type')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(sectionTypes).map(([value, label]) => (
                                                    <SelectItem key={value} value={value}>
                                                        {label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.type} />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Conditional Fields based on Type */}
                            {selectedType && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{t('sections.section_data')}</CardTitle>
                                        <CardDescription>
                                            {t('sections.configure_section_data')}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {selectedType === 'stores' && (
                                            <div>
                                                <Label>{t('sections.select_stores')}</Label>
                                                <MultiSelect
                                                    options={storeOptions}
                                                    selected={selectedStores}
                                                    onSelectedChange={(selected) => {
                                                        setSelectedStores(selected)
                                                    }}
                                                    placeholder={t('sections.select_stores_placeholder')}
                                                    searchPlaceholder={t('sections.search_stores')}
                                                    emptyMessage={t('sections.no_stores_found')}
                                                />
                                                {selectedStores.map((storeId: string | number) => (
                                                    <input
                                                        key={storeId}
                                                        type="hidden"
                                                        name="data[store_ids][]"
                                                        value={storeId}
                                                    />
                                                ))}
                                                <InputError message={errors['data.store_ids']} />
                                            </div>
                                        )}

                                        {selectedType === 'products' && (
                                            <div>
                                                <Label>{t('sections.select_products')}</Label>
                                                <MultiSelect
                                                    options={productOptions}
                                                    selected={selectedProducts}
                                                    onSelectedChange={(selected) => {
                                                        setSelectedProducts(selected)
                                                    }}
                                                    placeholder={t('sections.select_products_placeholder')}
                                                    searchPlaceholder={t('sections.search_products')}
                                                    emptyMessage={t('sections.no_products_found')}
                                                />
                                                {selectedProducts.map((productId: string | number) => (
                                                    <input
                                                        key={productId}
                                                        type="hidden"
                                                        name="data[product_ids][]"
                                                        value={productId}
                                                    />
                                                ))}
                                                <InputError message={errors['data.product_ids']} />
                                            </div>
                                        )}

                                        {selectedType === 'store_categories' && (
                                            <div>
                                                <Label>{t('sections.select_store_categories')}</Label>
                                                <MultiSelect
                                                    options={storeCategoryOptions}
                                                    selected={selectedStoreCategories}
                                                    onSelectedChange={(selected) => {
                                                        setSelectedStoreCategories(selected)
                                                    }}
                                                    placeholder={t('sections.select_store_categories_placeholder')}
                                                    searchPlaceholder={t('sections.search_store_categories')}
                                                    emptyMessage={t('sections.no_store_categories_found')}
                                                />
                                                {selectedStoreCategories.map((categoryId: string | number) => (
                                                    <input
                                                        key={categoryId}
                                                        type="hidden"
                                                        name="data[store_category_ids][]"
                                                        value={categoryId}
                                                    />
                                                ))}
                                                <InputError message={errors['data.store_category_ids']} />
                                            </div>
                                        )}

                                        {selectedType === 'features' && (
                                            <div className="space-y-4">
                                                <TranslatableTabs
                                                    fields={[
                                                        {
                                                            name: 'data[title]',
                                                            label: t('sections.feature_title'),
                                                            type: 'text',
                                                            value: featureTitle,
                                                            placeholder: t('sections.enter_feature_title'),
                                                        },
                                                        {
                                                            name: 'data[description]',
                                                            label: t('sections.feature_description'),
                                                            type: 'textarea',
                                                            value: featureDescription,
                                                        },
                                                    ]}
                                                    errors={errors}
                                                />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Right column – settings */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('sections.section_settings')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <IsActiveFormField value={section.is_active ?? true} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <FormButtons
                        processing={processing}
                        handleCancel={() => router.visit(sections.index.url())}
                        isEditMode={type === 'edit'}
                    />
                </>
            )}
        </Form>
    )
}
