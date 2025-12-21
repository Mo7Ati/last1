import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Option } from '@/types/dashboard'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import OptionForm from './components/option-form'
import options from '@/routes/store/options'

const OptionsEdit = ({ option }: { option: Option }) => {
    const { t } = useTranslation('dashboard')

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('options.title'),
            href: options.index.url(),
        },
        {
            title: t('options.edit'),
            href: options.edit.url({ option: Number(option.id) }),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('options.edit')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <OptionForm option={option} type="edit" />
            </div>
        </AppLayout>
    )
}

export default OptionsEdit

