import { Form, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Option } from '@/types/dashboard'
import FormButtons from '@/components/form/form-buttons'
import { normalizeFieldValue } from '@/lib/utils'
import TranslatableTabs from '@/components/form/translatable-tabs'
import IsActive from '@/components/form/is-active'
import options from '@/routes/store/options'

interface OptionFormProps {
    option: Option
    type: 'create' | 'edit'
}

export default function OptionForm({ option, type }: OptionFormProps) {
    const { t } = useTranslation('forms')

    return (
        <Form
            method={type === 'edit' ? 'put' : 'post'}
            action={
                (type === 'edit' && option.id)
                    ? options.update.url({ option: Number(option.id) })
                    : options.store.url()
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
                                        label: t('options.name'),
                                        type: 'text',
                                        value: normalizeFieldValue(option.name),
                                        placeholder: t('options.enter_name'),
                                    },
                                ]}
                                errors={errors}
                            />
                        </div>

                        {/* Right column – settings */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('options.option_settings')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <IsActive value={option.is_active ?? true} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <FormButtons
                        processing={processing}
                        handleCancel={() => router.visit(options.index.url())}
                        isEditMode={type === 'edit'}
                    />
                </>
            )}
        </Form>
    )
}

