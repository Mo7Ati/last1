<?php

return [
    'order_status' => [
        'pending' => 'قيد الإنتظار',
        'preparing' => 'جاري التحضير',
        'on_the_way' => 'جاري التوصيل',
        'completed' => 'مكتمل',
        'cancelled' => 'ملغي',
        'rejected' => 'مرفوض',
    ],
    'payment_status' => [
        'unpaid' => 'غير مدفوع',
        'paid' => 'مدفوع',
        'failed' => 'فشل',
        'refunded' => 'مسترجع',
    ],
    'permissions' => [
        'dashboard' => [
            'index' => 'عرض لوحة التحكم',
        ],
        'admins' => [
            'index' => 'عرض قائمة المديرين',
            'show' => 'عرض معلومات المدير',
            'create' => 'إنشاء مدير جديد',
            'update' => 'تحديث معلومات المدير',
            'destroy' => 'حذف المدير',
        ],
        'roles' => [
            'index' => 'عرض قائمة الأدوار',
            'show' => 'عرض معلومات الدور',
            'create' => 'إنشاء دور جديد',
            'update' => 'تحديث معلومات الدور',
            'destroy' => 'حذف الدور',
        ],
        'stores' => [
            'index' => 'عرض قائمة المتاجر',
            'show' => 'عرض معلومات المتجر',
            'create' => 'إنشاء متجر جديد',
            'update' => 'تحديث معلومات المتجر',
            'destroy' => 'حذف المتجر',
        ],
        'store-categories' => [
            'index' => 'عرض قائمة فئات المتاجر',
            'show' => 'عرض معلومات فئة المتجر',
            'create' => 'إنشاء فئة متجر جديدة',
            'update' => 'تحديث معلومات فئة المتجر',
            'destroy' => 'حذف فئة المتجر',
        ],
        'products' => [
            'index' => 'عرض قائمة المنتجات',
            'show' => 'عرض معلومات المنتج',
            'create' => 'إنشاء منتج جديد',
            'update' => 'تحديث معلومات المنتج',
            'destroy' => 'حذف المنتج',
        ],
        'orders' => [
            'index' => 'عرض قائمة الطلبات',
            'show' => 'عرض معلومات الطلب',
            'create' => 'إنشاء طلب جديد',
            'update' => 'تحديث معلومات الطلب',
            'destroy' => 'حذف الطلب',
        ],
        'users' => [
            'index' => 'عرض قائمة المستخدمين',
            'show' => 'عرض معلومات المستخدم',
            'create' => 'إنشاء مستخدم جديد',
            'update' => 'تحديث معلومات المستخدم',
            'destroy' => 'حذف المستخدم',
        ],
        'transactions' => [
            'index' => 'عرض قائمة المعاملات',
        ],
        'wallets' => [
            'index' => 'عرض قائمة المحافظ',
        ],
    ],
    'transaction_type' => [
        'deposit_order_total_in_store_wallet' => 'دفع قيمة الطلب للمتجر',
        'withdraw_platform_fee_from_store_wallet' => 'سحب قيمة حصة المنصة من المتجر',
        'deposit_platform_fee_to_platform_wallet' => 'دفع قيمة حصة المنصة من المتجر',
        'deposit_store_subscription_to_platform_wallet' => 'دفع قيمة اشتراك المتجر',
    ],
];
