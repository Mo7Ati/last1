import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { useTranslation } from 'react-i18next'
import SectionForm from './components/section-form'
import { Section } from '@/types/dashboard'
import sections from '@/routes/admin/sections'

const SectionsCreate = ({
    section,
    sectionTypes,
    products,
    categories,
    stores,
}: {
    section: Section
    sectionTypes: Record<string, string>
    products?: Array<{ id: number | string; name: string | Record<string, string> }>
    categories?: Array<{ id: number | string; name: string | Record<string, string> }>
    stores?: Array<{ id: number | string; name: string | Record<string, string> }>
}) => {
    const { t } = useTranslation('dashboard');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('sections.title') || 'Sections',
            href: sections.index.url(),
        },
        {
            title: t('sections.create') || 'Create Section',
            href: sections.create.url(),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={t('sections.create') || 'Create Section'}>
            <SectionForm
                section={section}
                sectionTypes={sectionTypes}
                products={products}
                categories={categories}
                stores={stores}
                type="create"
            />
        </AppLayout>
    )
}

export default SectionsCreate
