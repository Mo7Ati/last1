import { Form, router } from '@inertiajs/react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Admin } from '@/types/dashboard'
import adminRoutes from '@/routes/admin/admins'
import IsActive from '@/components/form/is-active'
import FormInput from '@/components/form/form-input'
import FormButtons from '@/components/form/form-buttons'
import { toast } from 'sonner'

interface AdminFormProps {
    admin?: Admin | null
}

export default function AdminForm({ admin }: AdminFormProps) {
    const isEditMode = !!admin
    return (
        <Card className=" max-w-2xl">
            <CardHeader>
                <CardTitle>
                    {isEditMode ? 'Edit Admin' : 'Create Admin'}
                </CardTitle>
                <CardDescription>
                    {isEditMode
                        ? 'Update the admin information below.'
                        : 'Fill in the information to create a new admin.'}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form
                    method={isEditMode ? 'put' : 'post'}
                    action={
                        isEditMode && admin
                            ? adminRoutes.update.url({ admin: admin.id })
                            : adminRoutes.store.url()
                    }
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <FormInput
                                name="name"
                                label="Name"
                                type="text"
                                required={true}
                                placeholder="Enter admin name"
                                defaultValue={admin?.name ?? ''}
                                error={errors.name}
                            />

                            <FormInput
                                name="email"
                                label="Email"
                                type="email"
                                required={true}
                                placeholder="Enter email address"
                                defaultValue={admin?.email ?? ''}
                                error={errors.email}
                            />

                            <FormInput
                                name="password"
                                label="Password"
                                type="password"
                                required={!isEditMode}
                                placeholder={isEditMode ? 'Enter new password (optional)' : 'Enter password (min. 8 characters)'}
                                hint={isEditMode ? 'Leave blank to keep current' : ''}
                                defaultValue={admin?.password ?? ''}
                                error={errors.password}
                            />

                            <IsActive value={admin?.is_active ?? true} />

                            <CardFooter className="flex justify-end gap-2">
                                <FormButtons
                                    processing={processing}
                                    handleCancel={() => router.visit(adminRoutes.index.url())}
                                    isEditMode={isEditMode}
                                />
                            </CardFooter>
                        </>
                    )}
                </Form>
            </CardContent>
        </Card>
    )
}

