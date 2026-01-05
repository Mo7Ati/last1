import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Category } from '@/types/dashboard'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import CategoryForm from './components/category-form'
import categories from '@/routes/store/categories'

const CategoriesEdit = ({ category }: { category: Category }) => {
    const { t } = useTranslation('dashboard')

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('categories.title'),
            href: categories.index.url(),
        },
        {
            title: t('categories.edit'),
            href: categories.edit.url({ category: Number(category.id) }),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('categories.edit')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <CategoryForm category={category} type="edit" />
            </div>
        </AppLayout>
    )
}

export default CategoriesEdit
