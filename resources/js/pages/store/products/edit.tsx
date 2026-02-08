import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Addition, Category, Option, Product } from '@/types/dashboard'
import { useTranslation } from 'react-i18next'
import ProductForm from './components/product-form'
import products from '@/routes/store/products'

const ProductsEdit = ({ product, categories, additions, options }: { product: Product; categories: Category[]; additions: Addition[]; options: Option[] }) => {
    const { t } = useTranslation('dashboard')

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('products.title'),
            href: products.index.url(),
        },
        {
            title: t('products.edit'),
            href: products.edit.url({ product: Number(product.id) }),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs} title={t('products.edit')}>
            <ProductForm product={product} categories={categories} additionsData={additions} optionsData={options} type="edit" />
        </AppLayout>
    )
}

export default ProductsEdit

