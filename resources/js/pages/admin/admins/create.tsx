import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import AdminForm from './components/admin-form'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admins',
        href: '/admin/admins',
    },
    {
        title: 'Create Admin',
        href: '/admin/admins/create',
    },
]

const AdminsCreate = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminForm />
            </div>
        </AppLayout>
    )
}

export default AdminsCreate

