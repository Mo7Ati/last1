import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Option } from '@/types/dashboard'
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
        <AppLayout breadcrumbs={breadcrumbs} title={t('options.edit')}>
            <OptionForm option={option} type="edit" />
        </AppLayout>
    )
}

export default OptionsEdit

