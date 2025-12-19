import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import AdminForm from './components/admin-form'
import adminRoutes from '@/routes/admin/admins'
import { Admin, Role } from '@/types/dashboard'

const AdminsCreate = ({ admin, roles }: { admin: Admin; roles: Role[] }) => {
    const { t } = useTranslation('dashboard');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('admins.title'),
            href: adminRoutes.index.url(),
        },
        {
            title: t('admins.create'),
            href: adminRoutes.create.url(),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('admins.create')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminForm admin={admin} roles={roles} type="create" />
            </div>
        </AppLayout>
    )
}

export default AdminsCreate

