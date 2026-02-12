import AppLayout from '@/layouts/app-layout'
import TransactionController from '@/wayfinder/App/Http/Controllers/dashboard/admin/TransactionController'
import React from 'react'
import { AdminTransaction } from '.'
import { PaginatedResponse } from '@/types/dashboard'
import { DataTable } from '@/components/table/data-table'
import { useTranslation } from 'react-i18next'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { BreadcrumbItem } from '@/types'




const SubscriptionsTransactions = ({ transactions: transactionsData }: { transactions: PaginatedResponse<AdminTransaction> }) => {
    const { t: tTables } = useTranslation('tables');
    const { t: tDashboard } = useTranslation('dashboard');

    const breadcrumbItems: BreadcrumbItem[] = [
        {
            title: tDashboard('nav_labels.subscriptions_transactions'),
            href: TransactionController.subscriptionsTransactions.url(),
        },
    ];

    const columns: ColumnDef<AdminTransaction>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={tTables('transactions.id') || 'ID'} indexRoute={TransactionController.index} />
            ),
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

    return (
        <AppLayout breadcrumbs={breadcrumbItems} title={tDashboard('nav_labels.subscriptions_transactions')}>
            <DataTable
                columns={columns}
                data={transactionsData.data}
                meta={transactionsData.meta}
                indexRoute={TransactionController.subscriptionsTransactions}
                model="transactions"
            />
        </AppLayout>
    )
}

export default SubscriptionsTransactions
