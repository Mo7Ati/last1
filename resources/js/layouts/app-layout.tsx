import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import useFlashMessagesHook from '@/hooks/use-flash-message';
import { Head } from '@inertiajs/react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
}

export default function AppLayout({ children, breadcrumbs, title, ...props }: AppLayoutProps) {
    useFlashMessagesHook();
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-2">
                {children}
            </div>
            <Toaster position="top-center" />
        </AppLayoutTemplate>
    );
}
