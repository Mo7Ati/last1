import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Addition } from '@/types/dashboard'
import { useTranslation } from 'react-i18next'
import AdditionForm from './components/addition-form'
import additions from '@/routes/store/additions'

const AdditionsEdit = ({ addition }: { addition: Addition }) => {
    const { t } = useTranslation('dashboard')

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('additions.title'),
            href: additions.index.url(),
        },
        {
            title: t('additions.edit'),
            href: additions.edit.url({ addition: Number(addition.id) }),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={t('additions.edit')}>
            <AdditionForm addition={addition} type="edit" />
        </AppLayout>
    )
}

export default AdditionsEdit

