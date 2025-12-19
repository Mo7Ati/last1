import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import RoleForm from './components/role-form'
import rolesRoutes from '@/routes/admin/roles'
import { GroupedPermissions, Role } from '@/types/dashboard'

const RolesCreate = ({ role, permissions }: { role: Role; permissions: GroupedPermissions }) => {
    const { t } = useTranslation('dashboard');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('roles.title'),
            href: rolesRoutes.index.url(),
        },
        {
            title: t('roles.create'),
            href: rolesRoutes.create.url(),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('roles.create')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <RoleForm role={role} permissions={permissions} type="create" />
            </div>
        </AppLayout>
    )
}

export default RolesCreate

