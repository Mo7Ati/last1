import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table"
import { Product, PaginatedResponse } from '@/types/dashboard';
import { DataTable } from '@/components/data-table/data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import products from '@/routes/admin/products';

const ProductsIndex = ({ products: productsData }: { products: PaginatedResponse<Product> }) => {
    const { t: tTabels } = useTranslation('tabels');
    const { t: tDashboard } = useTranslation('dashboard');

    const columns: ColumnDef<Product>[] = [
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
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTabels('products.id') || 'ID'} indexRoute={products.index} />
            ),
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: tTabels('products.name') || 'Name',
            cell: ({ row }) => {
                const name = row.original.name;
                if (typeof name === 'object' && name !== null) {
                    return name.en || name.ar || Object.values(name)[0] || '-';
                }
                return name || '-';
            },
        },
        {
            accessorKey: "store",
            header: tTabels('products.store') || 'Store',
            cell: ({ row }) => {
                const store = row.original.store;
                if (!store) return '-';
                const storeName = typeof store.name === 'object' && store.name !== null
                    ? (store.name.en || store.name.ar || Object.values(store.name)[0])
                    : store.name;
                return storeName || store.email || '-';
            },
        },
        {
            accessorKey: "category",
            header: tTabels('products.category') || 'Category',
            cell: ({ row }) => {
                const category = row.original.category;
                if (!category) return '-';
                const categoryName = typeof category.name === 'object' && category.name !== null
                    ? (category.name.en || category.name.ar || Object.values(category.name)[0])
                    : category.name;
                return categoryName || '-';
            },
        },
        {
            accessorKey: "price",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTabels('products.price') || 'Price'} indexRoute={products.index} />
            ),
            cell: ({ row }) => {
                const price = row.original.price;
                return price ? `$${price.toFixed(2)}` : '-';
            },
        },
        {
            accessorKey: "quantity",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTabels('products.quantity') || 'Quantity'} indexRoute={products.index} />
            ),
            cell: ({ row }) => {
                return row.original.quantity || 0;
            },
        },
        {
            accessorKey: "is_active",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTabels('products.is_active') || 'Active'} indexRoute={products.index} />
            ),
            cell: ({ row }) => {
                const isActive = row.original.is_active;
                return (
                    <Badge variant={isActive ? "secondary" : "outline"}>
                        {isActive ? tTabels('common.active') : tTabels('common.inactive')}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "is_accepted",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTabels('products.is_accepted') || 'Accepted'} indexRoute={products.index} />
            ),
            cell: ({ row }) => {
                const isAccepted = row.original.is_accepted;
                return (
                    <Badge variant={isAccepted ? "secondary" : "default"}>
                        {isAccepted ? 'Accepted' : 'Pending'}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTabels('products.created_at') || 'Created At'} indexRoute={products.index} />
            ),
        },
    ];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: tDashboard('products.title') || 'Products',
            href: '/admin/products',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={tDashboard('products.title') || 'Products'} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable
                    columns={columns}
                    data={productsData.data}
                    meta={productsData.meta}
                    indexRoute={products.index}
                    showCreateButton={false}
                />
            </div>
        </AppLayout>
    )
}

export default ProductsIndex;

