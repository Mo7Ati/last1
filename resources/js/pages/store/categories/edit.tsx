import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Category } from '@/types/dashboard'
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
        <AppLayout breadcrumbs={breadcrumbs} title={t('categories.edit')}>
            <CategoryForm category={category} type="edit" />
        </AppLayout>
    )
}

export default CategoriesEdit
