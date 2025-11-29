import { Head, usePage } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { SharedData, type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { useTranslation } from 'react-i18next';


export default function Appearance() {
    const { t } = useTranslation('settings');
    const { panel } = usePage<SharedData>().props;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('appearance.page_title'),
            href: `/${panel}/settings/appearance`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('appearance.page_title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={t('appearance.heading_title')}
                        description={t('appearance.heading_description')}
                    />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
