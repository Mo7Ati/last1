import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Store, PaginatedResponse, StoreCategory } from '@/types/dashboard'
import { useTranslation } from 'react-i18next'
import StoreForm from './components/store-form'
import stores from '@/routes/admin/stores'

const StoresEdit = ({ store, categories }: { store: Store; categories: StoreCategory[] }) => {
    const { t } = useTranslation('dashboard');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('stores.title'),
            href: stores.index.url(),
        },
        {
            title: t('stores.edit'),
            href: stores.edit.url({ store: store.id }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={t('stores.edit')}>
            <StoreForm store={store} categories={categories} type="edit" />
        </AppLayout>
    )
}

export default StoresEdit

