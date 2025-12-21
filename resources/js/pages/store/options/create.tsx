import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import OptionForm from './components/option-form'
import { Option } from '@/types/dashboard'
import options from '@/routes/store/options'

const OptionsCreate = ({ option }: { option: Option }) => {
    const { t } = useTranslation('dashboard')

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('options.title'),
            href: options.index.url(),
        },
        {
            title: t('options.create'),
            href: options.create.url(),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('options.create')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <OptionForm option={option} type="create" />
            </div>
        </AppLayout>
    )
}

export default OptionsCreate

