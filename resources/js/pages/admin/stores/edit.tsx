import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Store, PaginatedResponse, StoreCategory } from '@/types/dashboard'
import { Head } from '@inertiajs/react'
import StoreForm from './components/store-form'
import stores from '@/routes/admin/stores'


const StoresEdit = ({ store, categories }: { store: Store; categories: StoreCategory[] }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Stores',
            href: stores.index.url(),
        },
        {
            title: 'Edit Store',
            href: stores.edit.url({ store: store.id }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Store" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <StoreForm store={store} categories={categories} type="edit" />
            </div>
        </AppLayout>
    )
}

export default StoresEdit

