import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import CategoryForm from './components/category-form'
import { Category } from '@/types/dashboard'
import categories from '@/routes/store/categories'

const CategoriesCreate = ({ category }: { category: Category }) => {
    const { t } = useTranslation('dashboard')

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('categories.title'),
            href: categories.index.url(),
        },
        {
            title: t('categories.create'),
            href: categories.create.url(),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('categories.create')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <CategoryForm category={category} type="create" />
            </div>
        </AppLayout>
    )
}

export default CategoriesCreate
