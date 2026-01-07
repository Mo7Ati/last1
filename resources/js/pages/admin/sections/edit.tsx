import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import sectionsRoutes from '@/routes/admin/sections'
import { Section, Store, Product, StoreCategory } from '@/types/dashboard'
import SectionForm from './components/sections-form'

interface SectionsEditProps {
    section: Section
    sectionTypes: Record<string, string>
    stores?: Store[]
    products?: Product[]
    storeCategories?: StoreCategory[]
}

const SectionsEdit = ({ 
    section: sectionData, 
    sectionTypes,
    stores = [],
    products = [],
    storeCategories = []
}: SectionsEditProps) => {
    const { t } = useTranslation('dashboard');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('sections.title'),
            href: sectionsRoutes.index.url(),
        },
        {
            title: t('sections.edit'),
            href: sectionsRoutes.edit.url({ section: sectionData.id }),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('sections.edit')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <SectionForm 
                    section={sectionData} 
                    sectionTypes={sectionTypes}
                    stores={stores}
                    products={products}
                    storeCategories={storeCategories}
                    type="edit" 
                />
            </div>
        </AppLayout>
    )
}

export default SectionsEdit
