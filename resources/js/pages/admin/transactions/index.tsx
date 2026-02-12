import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from "@tanstack/react-table"
import { PaginatedResponse } from '@/types/dashboard';
import { DataTable } from '@/components/table/data-table';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import TransactionController from '@/wayfinder/App/Http/Controllers/dashboard/admin/TransactionController';
import TransactionTypeEnum from '@/wayfinder/App/Enums/TransactionTypeEnum';
import { Badge } from '@/components/ui/badge';


export interface AdminTransaction {
    id: number | string;
    order_id: number | null;
    receiver: string | null;
    store_id: number | null;
    store_name: string | null;
    amount: number;
    explanation: string;
    type: string;
    created_at: string | null;
    updated_at: string | null;
}

const TransactionsIndex = ({ transactions: transactionsData }: { transactions: PaginatedResponse<AdminTransaction> }) => {
    const { t: tTables } = useTranslation('tables');
    const { t: tDashboard } = useTranslation('dashboard');

    const explanationLabel = (value: string) => {
        const key = value === TransactionTypeEnum.DEPOSIT_ORDER_TOTAL_IN_STORE_WALLET ? 'ORDER_PAYMENT'
            : value === TransactionTypeEnum.WITHDRAW_PLATFORM_FEE_FROM_STORE_WALLET ? 'PLATFORM_SHARE'
                : value === TransactionTypeEnum.DEPOSIT_STORE_SUBSCRIPTION_TO_PLATFORM_WALLET ? 'STORE_SUBSCRIPTION'
                    : value;
        return tTables(`transactions.explanation_${key}`) || value;
    };

    const columns: ColumnDef<AdminTransaction>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTables('transactions.id') || 'ID'} indexRoute={TransactionController.index} />
            ),
            enableHiding: false,
        },
        {
            accessorKey: "receiver",
            header: tTables('transactions.receiver'),
        },
        {
            accessorKey: "source",
            header: tTables('transactions.source'),
        },
        {
            accessorKey: "amount",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTables('transactions.amount') || 'Amount'} indexRoute={TransactionController.index} />
            ),
        },
        {
            accessorKey: "explanation",
            header: tTables('transactions.explanation'),
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTables('transactions.created_at') || 'Created At'} indexRoute={TransactionController.index} />
            ),
        },
    ];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: tDashboard('transactions.title'),
            href: TransactionController.index.url(),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={tDashboard('transactions.title')}>
            <DataTable
                columns={columns}
                data={transactionsData.data}
                meta={transactionsData.meta}
                indexRoute={TransactionController.index}
                model="transactions"
            />
        </AppLayout>
    )
}

export default TransactionsIndex;
