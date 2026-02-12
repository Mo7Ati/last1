import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Admin, PaginatedResponse, Role } from '@/types/dashboard'
import { useTranslation } from 'react-i18next'
import AdminForm from './components/admin-form'
import adminRoutes from '@/routes/admin/admins'

const AdminsEdit = ({ admin, roles }: { admin: Admin; roles: Role[] }) => {
    const { t } = useTranslation('dashboard');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('admins.title'),
            href: adminRoutes.index.url(),
        },
        {
            title: t('admins.edit'),
            href: adminRoutes.edit.url({ admin: admin.id }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={t('admins.edit')}>
            <AdminForm admin={admin} roles={roles} type="edit" />
        </AppLayout>
    )
}

export default AdminsEdit
