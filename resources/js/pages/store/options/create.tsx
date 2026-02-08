import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
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
        <AppLayout breadcrumbs={breadcrumbs} title={t('options.create')}>
            <OptionForm option={option} type="create" />
        </AppLayout>
    )
}

export default OptionsCreate

