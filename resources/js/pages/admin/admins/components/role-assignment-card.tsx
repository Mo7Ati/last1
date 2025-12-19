import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { MultiSelect } from '@/components/ui/multi-select'
import { Role } from '@/types/dashboard'
import InputError from '@/components/input-error'

interface RoleAssignmentCardProps {
    roles: Role[]
    selectedRoleNames: string[]
    className?: string
    errors?: {
        roles?: string
    }
}

export default function RoleAssignmentCard({
    roles,
    selectedRoleNames,
    errors,
    className,
}: RoleAssignmentCardProps) {
    const { t } = useTranslation('forms');
    const [selectedRoles, setSelectedRoles] = useState<string[]>(selectedRoleNames);

    const options = roles.map((role) => ({
        label: role.name,
        value: role.name,
        permissions_count: role.permissions_count,
    }))

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{t('admins.assign_roles')}</CardTitle>
                <CardDescription>
                    {t('admins.assign_roles_desc')}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div>
                    {roles.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            {t('admins.no_roles_available')}
                        </p>
                    ) : (
                        <>
                            <MultiSelect
                                options={options}
                                selected={selectedRoles}
                                onSelectedChange={(selected) => {
                                    setSelectedRoles(selected as string[]);
                                }}
                                placeholder={t('admins.select_roles')}
                                searchPlaceholder={t('admins.search_roles')}
                                emptyMessage={t('admins.no_roles_found')}
                            />

                            {selectedRoles.map((roleName) => (
                                <input
                                    key={roleName}
                                    type="hidden"
                                    name="roles[]"
                                    value={roleName}
                                />
                            ))}
                        </>
                    )}
                    {errors?.roles && (
                        <InputError message={errors.roles} />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

