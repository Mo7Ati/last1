import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import StoreForm from './components/store-form'
import { Store, StoreCategory } from '@/types/dashboard'
import stores from '@/routes/admin/stores'


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stores',
        href: stores.index.url(),
    },
    {
        title: 'Create Store',
        href: stores.create.url(),
    },
]

const StoresCreate = ({ store, categories }: { store: Store; categories: StoreCategory[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Create Store" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <StoreForm store={store} categories={categories} type="create" />
            </div>
        </AppLayout >
    )
}

export default StoresCreate

