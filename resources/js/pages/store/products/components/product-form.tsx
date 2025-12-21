import { Form, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Addition, Category, Option, Product, ProductAddition, ProductOption } from '@/types/dashboard'
import FormButtons from '@/components/form/form-buttons'
import { normalizeFieldValue } from '@/lib/utils'
import TranslatableTabs from '@/components/form/translatable-tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import InputError from '@/components/input-error'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import IsActive from '@/components/form/is-active'
import FileUpload from '@/components/form/file-upload'
import products from '@/routes/store/products'
import IsActiveFormField from '@/components/form/is-active'
import { Repeater } from '@/components/repeater'

interface ProductFormProps {
    product: Product
    categories: Category[]
    additionsData: Addition[]
    optionsData: Option[]
    type: 'create' | 'edit'
}

export default function ProductForm({ product, categories, additionsData = [], optionsData = [], type }: ProductFormProps) {
    const { t } = useTranslation('forms');

    // Ensure arrays are always arrays (safety check)
    const safeAdditionsData = Array.isArray(additionsData) ? additionsData : [];
    const safeOptionsData = Array.isArray(optionsData) ? optionsData : [];

    // Initialize with unique IDs for tracking
    const [additions, setAdditions] = useState<ProductAddition[]>((product.additions || []).map((add, idx) => ({
        ...add,
        temp_id: `add-${Date.now()}-${idx}`,
    })));
    const [options, setOptions] = useState<ProductOption[]>((product.options || []).map((opt, idx) => ({
        ...opt,
        temp_id: `opt-${Date.now()}-${idx}`,
    })));
    return (
        <Form
            method={type === 'edit' ? 'put' : 'post'}
            action={
                (type === 'edit' && product.id)
                    ? products.update.url({ product: Number(product.id) })
                    : products.store.url()
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
                                        name: 'name',
                                        label: t('products.name'),
                                        type: 'text',
                                        value: normalizeFieldValue(product.name),
                                        placeholder: t('products.enter_name'),
                                    },
                                    {
                                        name: 'description',
                                        label: t('products.description'),
                                        type: 'textarea',
                                        value: normalizeFieldValue(product.description),
                                    },
                                ]}
                                errors={errors}
                            />

                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('products.keywords')}</CardTitle>
                                    <CardDescription>
                                        {t('products.keywords_desc')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <Label htmlFor="keywords">{t('products.keywords')}</Label>
                                        <Input
                                            id="keywords"
                                            name="keywords"
                                            type="text"
                                            defaultValue={Array.isArray(product.keywords) ? product.keywords.join(', ') : ''}
                                            placeholder={t('products.enter_keywords')}
                                            aria-invalid={errors.keywords ? 'true' : 'false'}
                                        />
                                        <span className="text-muted-foreground text-xs">
                                            {t('products.keywords_hint')}
                                        </span>
                                        <InputError message={errors.keywords} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('products.product_images')}</CardTitle>
                                    <CardDescription>
                                        {t('products.product_images_desc')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FileUpload
                                        name="temp_ids"
                                        label={t('products.images')}
                                        multiple={true}
                                        acceptedFileTypes={['image/*']}
                                        maxFiles={10}
                                        maxFileSize="5MB"
                                        error={errors.temp_ids}
                                        files={product.images ? product.images.map((image: any) => ({
                                            source: String(image.id) + '/' + image.file_name,
                                            options: {
                                                type: 'local',
                                            },
                                        })) : []}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right column – pricing & settings */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('products.pricing')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="price">{t('products.price')}</Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            required
                                            defaultValue={product.price}
                                            placeholder={t('products.enter_price')}
                                            aria-invalid={errors.price ? 'true' : 'false'}
                                        />
                                        <InputError message={errors.price} />
                                    </div>

                                    <div>
                                        <Label htmlFor="compare_price">{t('products.compare_price')}</Label>
                                        <Input
                                            id="compare_price"
                                            name="compare_price"
                                            type="number"
                                            step="0.01"
                                            defaultValue={product.compare_price || ''}
                                            placeholder={t('products.enter_compare_price')}
                                            aria-invalid={errors.compare_price ? 'true' : 'false'}
                                        />
                                        <span className="text-muted-foreground text-xs">
                                            {t('products.compare_price_desc')}
                                        </span>
                                        <InputError message={errors.compare_price} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('products.product_category')}</CardTitle>
                                    <CardDescription>
                                        {t('products.select_category')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <Label htmlFor="category_id">{t('products.category')}</Label>
                                        <Select
                                            defaultValue={String(product.category_id)}
                                            name="category_id"
                                        >
                                            <SelectTrigger id="category_id" aria-invalid={errors.category_id ? 'true' : 'false'}>
                                                <SelectValue placeholder={t('products.select_category')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="null">{t('products.no_category')}</SelectItem>
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={String(category.id)}
                                                    >
                                                        {category.name as string}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.category_id} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('products.product_settings')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="quantity">{t('products.quantity')}</Label>
                                        <Input
                                            id="quantity"
                                            name="quantity"
                                            type="number"
                                            min="0"
                                            defaultValue={product.quantity || 0}
                                            placeholder={t('products.enter_quantity')}
                                            aria-invalid={errors.quantity ? 'true' : 'false'}
                                        />
                                        <InputError message={errors.quantity} />
                                    </div>

                                    <IsActiveFormField value={product.is_active} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className='flex gap-4 mt-4 items-start'>
                        <Card className='w-1/2 h-auto'>
                            <CardHeader>
                                <CardTitle>{t('products.additions')}</CardTitle>
                                <CardDescription>
                                    {t('products.additions_desc')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='min-h-fit'>
                                <Repeater<ProductAddition>
                                    label="Optional Add-ons"
                                    items={additions}
                                    onChange={setAdditions}
                                    onAddItem={() => ({ addition_id: 0, price: 0, temp_id: `add-${Date.now()}-${Math.random()}` })} // Default structure
                                    renderFields={(item, index, update) => {
                                        // Get all selected addition IDs from other items (excluding current item by unique ID)
                                        const currentItemId = (item as any).temp_id;
                                        const selectedAdditionIds = additions
                                            .filter((add) => (add as any).temp_id !== currentItemId)
                                            .map((add) => add.addition_id)
                                            .filter((id): id is number => id !== null && id !== 0)
                                            .map(id => String(id));

                                        // Filter additions: exclude already selected ones, but include current item's selection
                                        const availableAdditions = safeAdditionsData.filter((addition) => {
                                            const additionIdStr = String(addition.id);
                                            // Include if not selected elsewhere, or if it's the current item's selection
                                            return !selectedAdditionIds.includes(additionIdStr) ||
                                                (item.addition_id && String(item.addition_id) === additionIdStr);
                                        });

                                        return (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <Label htmlFor={`addition_id-${index}`}>Addition</Label>
                                                    <Select
                                                        value={item.addition_id ? String(item.addition_id) : ''}
                                                        onValueChange={(value) => update({ addition_id: value })}
                                                    >
                                                        <SelectTrigger id={`addition_id-${index}`}>
                                                            <SelectValue placeholder="Select an addition" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {availableAdditions.map((addition) => (
                                                                <SelectItem key={addition.id} value={String(addition.id)}>
                                                                    {typeof addition.name === 'string'
                                                                        ? addition.name
                                                                        : addition.name.en || addition.name.ar || String(addition.id)}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <input
                                                        type="hidden"
                                                        name={`additions[${index}][addition_id]`}
                                                        value={item.addition_id || ''}
                                                    />
                                                    <InputError message={errors[`additions.${index}.addition_id`]} />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label htmlFor={`price-${index}`}>Price ($)</Label>
                                                    <Input
                                                        id={`price-${index}`}
                                                        name={`additions[${index}][price]`}
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={item.price}
                                                        placeholder="0.00"
                                                        onChange={(e) => update({ price: Number(e.target.value) })}
                                                    />
                                                    <InputError message={errors[`additions.${index}.price`]} />
                                                </div>
                                            </div>
                                        );
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card className='w-1/2 h-auto'>
                            <CardHeader>
                                <CardTitle>{t('products.options')}</CardTitle>
                                <CardDescription>
                                    {t('products.options_desc')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='min-h-fit'>
                                <Repeater<ProductOption>
                                    label="Optional Options"
                                    items={options}
                                    onChange={setOptions}
                                    onAddItem={() => ({ option_id: 0, price: 0, temp_id: `opt-${Date.now()}-${Math.random()}` })} // Default structure
                                    renderFields={(item, index, update) => {
                                        // Get all selected option IDs from other items (excluding current item by unique ID)
                                        const currentItemId = (item as any).temp_id;
                                        const selectedOptionIds = options
                                            .filter((opt) => (opt as any).temp_id !== currentItemId)
                                            .map((opt) => opt.option_id)
                                            .filter((id): id is number => id !== null && id !== 0)
                                            .map(id => String(id));

                                        // Filter options: exclude already selected ones, but include current item's selection
                                        const availableOptions = safeOptionsData.filter((option) => {
                                            const optionIdStr = String(option.id);
                                            // Include if not selected elsewhere, or if it's the current item's selection
                                            return !selectedOptionIds.includes(optionIdStr) ||
                                                (item.option_id && String(item.option_id) === optionIdStr);
                                        });

                                        return (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <Label htmlFor={`option_id-${index}`}>Option</Label>
                                                    <Select
                                                        value={item.option_id ? String(item.option_id) : ''}
                                                        onValueChange={(value) => update({ option_id: value })}
                                                    >
                                                        <SelectTrigger id={`option_id-${index}`}>
                                                            <SelectValue placeholder="Select an option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {availableOptions.map((option) => (
                                                                <SelectItem key={option.id} value={String(option.id)}>
                                                                    {option.name as string}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <input type="hidden" name={`options[${index}][option_id]`} value={item.option_id || ''} />
                                                    <InputError message={errors[`options.${index}.option_id`]} />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label htmlFor={`price-${index}`}>Price ($)</Label>
                                                    <Input
                                                        id={`price-${index}`}
                                                        name={`options[${index}][price]`}
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={item.price}
                                                        placeholder="0.00"
                                                        onChange={(e) => update({ price: Number(e.target.value) })}
                                                    />
                                                    <InputError message={errors[`options.${index}.price`]} />
                                                </div>
                                            </div>
                                        );
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>


                    <FormButtons
                        processing={processing}
                        handleCancel={() => router.visit(products.index.url())}
                        isEditMode={type === 'edit'}
                    />
                </>
            )}
        </Form>
    )
}

