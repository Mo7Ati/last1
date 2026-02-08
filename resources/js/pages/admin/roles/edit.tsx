import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { GroupedPermissions, Role } from '@/types/dashboard'
import { useTranslation } from 'react-i18next'
import RoleForm from './components/role-form'
import rolesRoutes from '@/routes/admin/roles'

const RolesEdit = ({ role, permissions }: { role: Role; permissions: GroupedPermissions }) => {
    const { t } = useTranslation('dashboard');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('roles.title'),
            href: rolesRoutes.index.url(),
        },
        {
            title: t('roles.edit'),
            href: rolesRoutes.edit.url({ role: role.id }),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={t('roles.edit')}>
            <RoleForm role={role} permissions={permissions} type="edit" />
        </AppLayout>
    )
}

export default RolesEdit

