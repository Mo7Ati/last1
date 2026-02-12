import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { useTranslation } from 'react-i18next'
import StoreForm from './components/store-form'
import { Store, StoreCategory } from '@/types/dashboard'
import stores from '@/routes/admin/stores'

const StoresCreate = ({ store, categories }: { store: Store; categories: StoreCategory[] }) => {
    const { t } = useTranslation('dashboard');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('stores.title'),
            href: stores.index.url(),
        },
        {
            title: t('stores.create'),
            href: stores.create.url(),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={t('stores.create')}>
            <StoreForm store={store} categories={categories} type="create" />
        </AppLayout>
    )
}

export default StoresCreate

