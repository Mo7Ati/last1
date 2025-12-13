import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { MoreHorizontal, PencilIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table"
import { Store, PaginatedResponse } from '@/types/dashboard';
import { DataTable } from '@/components/data-table/data-table';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { t } from 'i18next';
import { Checkbox } from '@/components/ui/checkbox';

import StoresFilters from './components/store-filters';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import DeleteAction from '@/components/delete-action';
import stores from '@/routes/admin/stores';

const columns: ColumnDef<Store>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const name = row.original.name;
            if (typeof name === 'object' && name !== null) {
                return name.en || name.ar || Object.values(name)[0] || '-';
            }
            return name || '-';
        },
        enableHiding: false,
    },
    {
        accessorKey: "email",
        header: "Email",
        enableHiding: false,
    },
    {
        accessorKey: "phone",
        header: "Phone",
        enableHiding: false,
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const category = row.original.category;
            if (!category) return '-';
            const categoryName = typeof category.name === 'object'
                ? (category.name.en || category.name.ar || Object.values(category.name)[0])
                : category.name;
            return categoryName || '-';
        },
    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.original.is_active
            return (
                <Badge variant={isActive ? "secondary" : "default"}>
                    {isActive ? "Active" : "Inactive"}
                </Badge>
            )
        },
        enableHiding: false,
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" indexRoute={stores.index} />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const store = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        <DropdownMenuItem onClick={() => router.visit(stores.edit.url({ store: store.id }))} >
                            <PencilIcon className="h-4 w-4" /> {t('Edit')}
                        </DropdownMenuItem>

                        <DeleteAction onDelete={() => router.delete(stores.destroy.url({ store: store.id }))} />
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
        enableHiding: false,
    },
]

const StoresIndex = ({ stores: storesData }: { stores: PaginatedResponse<Store> }) => {
    console.log(stores);

    const { t } = useTranslation('tables');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Stores',
            href: '/admin/stores',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stores" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable
                    columns={columns}
                    data={storesData.data}
                    meta={storesData.meta}
                    filters={<StoresFilters />}
                    onRowClick={(store) => router.visit(stores.edit.url({ store: store.id }), { preserveState: true, preserveScroll: true })}
                    createHref={stores.create.url()}
                    indexRoute={stores.index}
                    showCreateButton={true}
                />
            </div>
        </AppLayout>
    )
}

export default StoresIndex;

