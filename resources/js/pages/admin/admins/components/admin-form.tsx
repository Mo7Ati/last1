import { Form, router } from '@inertiajs/react'
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
                                    {type === 'edit' ? 'Edit Admin' : 'Create Admin'}
                                </CardTitle>
                                <CardDescription>
                                    {type === 'edit'
                                        ? 'Update the admin information below.'
                                        : 'Fill in the information to create a new admin.'}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4 md:space-y-6">
                                <FormInput
                                    name="name"
                                    label="Name"
                                    type="text"
                                    required={true}
                                    placeholder="Enter admin name"
                                    defaultValue={admin.name}
                                    error={errors.name}
                                />

                                <FormInput
                                    name="email"
                                    label="Email"
                                    type="email"
                                    required={true}
                                    placeholder="Enter email address"
                                    defaultValue={admin.email}
                                    error={errors.email}
                                />

                                <FormInput
                                    name="password"
                                    label="Password"
                                    type="password"
                                    required={type === 'create'}
                                    placeholder={type === 'create' ? 'Enter password (min. 8 characters)' : 'Enter new password (optional)'}
                                    hint={type === 'create' ? '' : 'Leave blank to keep current'}
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

