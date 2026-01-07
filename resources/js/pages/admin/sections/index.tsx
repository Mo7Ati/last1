import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table"
import { Admin, PaginatedResponse, Section } from '@/types/dashboard';
import { DataTable } from '@/components/data-table/data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { EditAction } from '@/components/data-table/column-actions/edit-action';
import { DeleteAction } from '@/components/data-table/column-actions/delete-action-button';
import IsActiveTableColumn from '@/components/data-table/badges/is-active-badge';
import sections from '@/routes/admin/sections';

const SectionsIndex = ({ sections: sectionsData }: { sections: PaginatedResponse<Section> }) => {
    const { t: tTables } = useTranslation('tables');
    const { t: tDashboard } = useTranslation('dashboard');

    const columns: ColumnDef<Section>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label={tTables('common.select_all')}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label={tTables('common.select_row')}
                />
            ),
            enableHiding: false,
        },
        {
            accessorKey: "title",
            header: tTables('sections.title'),
            enableHiding: false,
        },
        {
            accessorKey: "description",
            header: tTables('sections.description'),
            enableHiding: false,
        },
        {
            accessorKey: "is_active",
            header: tTables('common.status'),
            cell: ({ row }) => <IsActiveTableColumn isActive={row.original.is_active} />,
            enableHiding: false,
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTables('sections.created_at')} indexRoute={sections.index} />
            ),
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }: any) => {
                return (
                    <div className="flex items-center gap-2">
                        <EditAction
                            editRoute={sections.edit.url({ section: row.original.id })}
                            permission="sections.update"
                        />
                        <DeleteAction
                            deleteRoute={sections.destroy.url({ section: row.original.id })}
                            permission="sections.destroy"
                        />
                    </div>
                );
            },
        },
    ]

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: tDashboard('sections.title'),
            href: sections.index.url(),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={tDashboard('sections.title')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable
                    columns={columns}
                    data={sectionsData.data}
                    meta={sectionsData.meta}
                    model="sections"
                    // filters={<SectionsFilters />}
                    onRowClick={(section) => router.visit(sections.edit({ section: section.id }), { preserveState: true, preserveScroll: true })}
                    createHref={sections.create.url()}
                    indexRoute={sections.index}
                />
            </div>
        </AppLayout>
    )
}

export default SectionsIndex;
