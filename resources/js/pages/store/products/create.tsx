import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('products.create')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <ProductForm product={product} categories={categories} additionsData={additions} optionsData={options} type="create" />
            </div>
        </AppLayout>
    )
}

export default ProductsCreate

