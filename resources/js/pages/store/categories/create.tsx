import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
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
        <AppLayout breadcrumbs={breadcrumbs} title={t('categories.create')}>
            <CategoryForm category={category} type="create" />
        </AppLayout>
    )
}

export default CategoriesCreate
