import { Form, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Admin, Role } from '@/types/dashboard'
import adminRoutes from '@/routes/admin/admins'
import IsActive from '@/components/form/is-active'
import FormInput from '@/components/form/form-input'
import RoleAssignmentCard from './role-assignment-card'
import FormButtons from '@/components/form/form-buttons'

interface AdminFormProps {
    admin: Admin
    roles: Role[]
    type: 'create' | 'edit'
}

export default function AdminForm({ admin, roles, type }: AdminFormProps) {
    const { t } = useTranslation('forms');

    return (
        <Form
            method={type === 'edit' ? 'put' : 'post'}
            action={
                (type === 'edit' && admin.id)
                    ? adminRoutes.update.url({ admin: admin.id })
                    : adminRoutes.store.url()
            }
        >
            {({ processing, errors }) => (
                <>
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {type === 'edit' ? t('admins.edit_admin') : t('admins.create')}
                                </CardTitle>
                                <CardDescription>
                                    {type === 'edit'
                                        ? t('admins.update_admin_info')
                                        : t('admins.create_admin_info')}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4 md:space-y-6">
                                <FormInput
                                    name="name"
                                    label={t('admins.name')}
                                    type="text"
                                    required={true}
                                    placeholder={t('admins.enter_admin_name')}
                                    defaultValue={admin.name}
                                    error={errors.name}
                                />

                                <FormInput
                                    name="email"
                                    label={t('admins.email')}
                                    type="email"
                                    required={true}
                                    placeholder={t('admins.enter_email')}
                                    defaultValue={admin.email}
                                    error={errors.email}
                                />

                                <FormInput
                                    name="password"
                                    label={t('admins.password')}
                                    type="password"
                                    required={type === 'create'}
                                    placeholder={type === 'create' ? t('admins.enter_password') : t('admins.enter_new_password')}
                                    hint={type === 'create' ? '' : t('admins.leave_blank')}
                                    error={errors.password}
                                />

                                <IsActive value={admin.is_active ?? true} />
                            </CardContent>
                        </Card>

                        <RoleAssignmentCard
                            roles={roles}
                            selectedRoleNames={admin.roles?.map((role) => role.name) ?? []}
                            errors={errors}
                        />
                    </div>

                    <FormButtons
                        processing={processing}
                        handleCancel={() => router.visit(adminRoutes.index.url())}
                        isEditMode={type === 'edit'}
                    />
                </>
            )}
        </Form>
    )
}

