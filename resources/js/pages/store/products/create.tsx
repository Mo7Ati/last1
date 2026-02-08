import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { useTranslation } from 'react-i18next'
import ProductForm from './components/product-form'
import { Addition, Category, Option, Product } from '@/types/dashboard'
import products from '@/routes/store/products'

const ProductsCreate = ({ product, categories, additions, options }: { product: Product; categories: Category[]; additions: Addition[]; options: Option[] }) => {
    const { t } = useTranslation('dashboard')

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('products.title'),
            href: products.index.url(),
        },
        {
            title: t('products.create'),
            href: products.create.url(),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={t('products.create')}>
            <ProductForm product={product} categories={categories} additionsData={additions} optionsData={options} type="create" />
        </AppLayout>
    )
}

export default ProductsCreate

