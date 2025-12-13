import { useState, useEffect } from 'react'
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
    const [selectedRoles, setSelectedRoles] = useState<string[]>(selectedRoleNames);

    const options = roles.map((role) => ({
        label: role.name,
        value: role.name,
        permissions_count: role.permissions_count,
    }))

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Assign Roles</CardTitle>
                <CardDescription>
                    Select the roles to assign to this admin. The admin will inherit all permissions from the selected roles.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div>
                    {roles.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No roles available. Please create roles first.
                        </p>
                    ) : (
                        <>
                            <MultiSelect
                                options={options}
                                selected={selectedRoles}
                                onSelectedChange={(selected) => {
                                    setSelectedRoles(selected as string[]);
                                }}
                                placeholder="Select roles..."
                                searchPlaceholder="Search roles..."
                                emptyMessage="No roles found."
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

