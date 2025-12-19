import { DataTable } from '@/components/data-table/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { PaginatedResponse, Role } from '@/types/dashboard'
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, PencilIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,

} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import DeleteAction from '@/components/delete-action';
import rolesRoutes from '@/routes/admin/roles';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import roles from '@/routes/admin/roles';

const RolesIndex = ({ roles }: { roles: PaginatedResponse<Role> }) => {
    const { t: tTabels } = useTranslation('tabels');
    const { t: tDashboard } = useTranslation('dashboard');
    const { t: tForms } = useTranslation('forms');

    const columns: ColumnDef<Role>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label={tTabels('common.select_all')}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label={tTabels('common.select_row')}
                />
            ),
            enableHiding: false,
        },
        {
            accessorKey: 'name',
            header: tTabels('roles.name'),
            enableHiding: false,
        },
        {
            accessorKey: 'guard_name',
            header: tTabels('roles.guard_name'),
            enableHiding: false,
        },
        {
            accessorKey: 'permissions_count',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTabels('roles.permissions_count')} indexRoute={roles.index} />
            ),
            enableHiding: false,
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTabels('roles.created_at')} indexRoute={roles.index} />
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const role = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">{tTabels('common.open_menu')}</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuItem onClick={() => router.visit(rolesRoutes.edit({ role: role.id }))} >
                                <PencilIcon className="h-4 w-4" /> {tForms('roles.edit')}
                            </DropdownMenuItem>
                            <DeleteAction onDelete={() => router.delete(rolesRoutes.destroy({ role: role.id }))} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
            enableHiding: false,
        },
    ];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: tDashboard('roles.title'),
            href: '/admin/roles',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={tDashboard('roles.title')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable
                    columns={columns}
                    data={roles.data}
                    meta={roles.meta}
                    createHref={rolesRoutes.create.url()}
                    showCreateButton={true}
                    indexRoute={rolesRoutes.index}
                    onRowClick={(role) => router.visit(rolesRoutes.edit({ role: role.id }), { preserveState: true, preserveScroll: true })}
                />
            </div>
        </AppLayout>
    );
}

export default RolesIndex
