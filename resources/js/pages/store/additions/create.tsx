import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { useTranslation } from 'react-i18next'
import AdditionForm from './components/addition-form'
import { Addition } from '@/types/dashboard'
import additions from '@/routes/store/additions'

const AdditionsCreate = ({ addition }: { addition: Addition }) => {
    const { t } = useTranslation('dashboard')

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('additions.title'),
            href: additions.index.url(),
        },
        {
            title: t('additions.create'),
            href: additions.create.url(),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={t('additions.create')}>
            <AdditionForm addition={addition} type="create" />
        </AppLayout>
    )
}

export default AdditionsCreate

