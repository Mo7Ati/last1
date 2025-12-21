import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Addition } from '@/types/dashboard'
import { Head } from '@inertiajs/react'
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('additions.edit')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdditionForm addition={addition} type="edit" />
            </div>
        </AppLayout>
    )
}

export default AdditionsEdit

