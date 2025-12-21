import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('additions.create')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdditionForm addition={addition} type="create" />
            </div>
        </AppLayout>
    )
}

export default AdditionsCreate

