import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { GroupedPermissions, Role } from '@/types/dashboard'
import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'

const PermissionList = ({ role, permissions }: { role: Role; permissions: GroupedPermissions }) => {
    const { t } = useTranslation('forms');
    const [selectedPermissionNames, setSelectedPermissionNames] = useState<string[]>(role.permissions?.map((p) => p.name) || []);

    const getGroupLabel = (group: string): string => {
        const key = `permissions.${group}`;
        const altKey = `permissions.${group.replace(/-/g, '_')}`;
        const translation = t(key);
        if (translation !== key) return translation;
        const altTranslation = t(altKey);
        return altTranslation !== altKey ? altTranslation : group.replace(/([A-Z])/g, " $1");
    };

    const getActionLabel = (action: string): string => {
        const key = `permissions.${action}`;
        const translation = t(key);
        return translation !== key ? translation : action.replace(/([A-Z])/g, " $1");
    };

    const handlePermissionToggle = (permissionName: string, checked: boolean) => {
        setSelectedPermissionNames((prev) => {
            if (checked) {
                return [...prev, permissionName];
            } else {
                return prev.filter((name) => name !== permissionName);
            }
        });
    };

    const handleSelectAllGroup = (group: string, checked: boolean) => {
        setSelectedPermissionNames((prev) => {
            if (checked) {
                return [...prev, ...permissions[group].map((p) => p.name)];
            } else {
                return prev.filter((name) => !permissions[group].map((p) => p.name).includes(name));
            }
        });
    }

    const handleSelectAllPermissions = (checked: boolean) => {
        Object.entries(permissions).forEach(([group, perms]) => {
            perms.forEach((p) => {
                handlePermissionToggle(p.name, checked === true);
            });
        });
    }

    return (
        <>
            <div className="flex justify-end gap-3">
                <Checkbox
                    id={'select-all'}
                    defaultChecked={Object.values(permissions).every((perms) => perms.every((p) => selectedPermissionNames.includes(p.name)))}
                    onCheckedChange={handleSelectAllPermissions}
                />
                <Label htmlFor={'select-all'} className="text-sm font-normal cursor-pointer">{t('roles.select_all_permissions')}</Label>
            </div>
            {Object.entries(permissions).map(([group, perms]) => (
                <Card key={group} className="border-muted">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base capitalize flex items-center justify-between">
                            <span>{getGroupLabel(group)}</span>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id={`select-all-${group}`}
                                    checked={perms.every((p) => selectedPermissionNames.includes(p.name))}
                                    onCheckedChange={(checked) => {
                                        handleSelectAllGroup(group, checked === true);
                                    }}
                                />
                                <Label htmlFor={`select-all-${group}`} className="text-sm font-normal cursor-pointer">{t('roles.select_all')}</Label>
                            </div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {perms.map((permission) => {
                            const isChecked = selectedPermissionNames.includes(permission.name);
                            const action = permission.name.split('.').pop() || '';
                            return (
                                <div
                                    key={permission.id}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`perm-${permission.id}`}
                                        checked={isChecked}
                                        onCheckedChange={(checked) => {
                                            handlePermissionToggle(permission.name, checked === true);
                                        }}
                                    />

                                    <Label
                                        htmlFor={`perm-${permission.id}`}
                                        className="cursor-pointer text-sm"
                                    >
                                        {getActionLabel(action)}
                                    </Label>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            ))}

            {selectedPermissionNames.map((permissionName) => (
                <input
                    key={permissionName}
                    type="hidden"
                    name="permissions[]"
                    value={permissionName}
                />
            ))}
        </>
    )
}

export default PermissionList
