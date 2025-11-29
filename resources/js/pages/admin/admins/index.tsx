import { PlaceholderPattern } from '@/components/ui/placeholder-pattern'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Table } from 'lucide-react';
import React from 'react'
import { useTranslation } from 'react-i18next';

const AdminsIndex = () => {
    const { t } = useTranslation('tables');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('admins.title'),
            href: '/admin/admins',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('admins.title')} />
            
        </AppLayout>
    )
}

export default AdminsIndex
