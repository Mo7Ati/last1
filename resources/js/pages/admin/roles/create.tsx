import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
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
        <AppLayout breadcrumbs={breadcrumbs} title={t('roles.create')}>
            <RoleForm role={role} permissions={permissions} type="create" />
        </AppLayout>
    )
}

export default RolesCreate

