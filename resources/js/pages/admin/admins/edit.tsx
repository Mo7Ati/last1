import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Admin, PaginatedResponse } from '@/types/dashboard'
import { Head } from '@inertiajs/react'
import AdminForm from './components/admin-form'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admins',
        href: '/admin/admins',
    },
    {
        title: 'Edit Admin',
        href: '/admin/admins/edit',
    },
]

const AdminsEdit = ({admin}: {admin: Admin}) => {
    console.log(admin);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminForm admin={admin} />
            </div>
        </AppLayout>
    )
}

export default AdminsEdit
