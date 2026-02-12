import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table"
import { PaginatedResponse } from '@/types/dashboard';
import { DataTable } from '@/components/table/data-table';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { TransactionType } from '@/types/dashboard';
import storeRoutes from '@/routes/store';

export interface StoreTransaction {
    id: number | string;
    receiver?: string | null;
    amount: number;
    explanation: string;
    created_at: string | null;
    updated_at: string | null;
    source?: string | null;
}

const StoreTransactionsIndex = ({ transactions: transactionsData }: { transactions: PaginatedResponse<StoreTransaction> }) => {
    const { t: tTables } = useTranslation('tables');
    const { t: tDashboard } = useTranslation('dashboard');

    const explanationLabel = (value: string) => {
        const key = value === TransactionType.DEPOSIT_ORDER_TOTAL_IN_STORE_WALLET ? 'ORDER_PAYMENT'
            : value === TransactionType.WITHDRAW_PLATFORM_FEE_FROM_STORE_WALLET ? 'PLATFORM_SHARE'
                : value === TransactionType.DEPOSIT_STORE_SUBSCRIPTION_TO_PLATFORM_WALLET ? 'STORE_SUBSCRIPTION'
                    : value;
        return tTables(`transactions.explanation_${key}`) || value;
    };

    const columns: ColumnDef<StoreTransaction>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTables('transactions.id') || 'ID'} indexRoute={storeRoutes.transactions.index} />
            ),
            enableHiding: false,
        },
        {
            accessorKey: "source",
            header: tTables('transactions.source'),
        },
        {
            accessorKey: "amount",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTables('transactions.amount') || 'Amount'} indexRoute={storeRoutes.transactions.index} />
            ),
        },
        {
            accessorKey: "explanation",
            header: tTables('transactions.explanation'),
            cell: ({ row }) => explanationLabel(row.original.explanation),
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTables('transactions.created_at') || 'Created At'} indexRoute={storeRoutes.transactions.index} />
            ),
        },
    ];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: tDashboard('transactions.title'),
            href: storeRoutes.transactions.index.url(),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={tDashboard('transactions.title')}>
            <DataTable
                columns={columns}
                data={transactionsData.data}
                meta={transactionsData.meta}
                indexRoute={storeRoutes.transactions.index}
                model="transactions"
            />
        </AppLayout>
    )
}

export default StoreTransactionsIndex;

