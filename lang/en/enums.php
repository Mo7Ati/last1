<?php

return [
    'order_status' => [
        'pending' => 'Pending',
        'preparing' => 'Preparing',
        'on_the_way' => 'On The Way',
        'completed' => 'Completed',
        'cancelled' => 'Cancelled',
        'rejected' => 'Rejected',
    ],
    'payment_status' => [
        'unpaid' => 'Unpaid',
        'paid' => 'Paid',
        'failed' => 'Failed',
        'refunded' => 'Refunded',
    ],
    'permissions' => [
        'dashboard' => [
            'index' => 'View dashboard',
        ],
        'admins' => [
            'index' => 'View admins list',
            'show' => 'View admin details',
            'create' => 'Create new admin',
            'update' => 'Update admin details',
            'destroy' => 'Delete admin',
        ],
        'roles' => [
            'index' => 'View roles list',
            'show' => 'View role details',
            'create' => 'Create new role',
            'update' => 'Update role details',
            'destroy' => 'Delete role',
        ],
        'stores' => [
            'index' => 'View stores list',
            'show' => 'View store details',
            'create' => 'Create new store',
            'update' => 'Update store details',
            'destroy' => 'Delete store',
        ],
        'store-categories' => [
            'index' => 'View store categories list',
            'show' => 'View store category details',
            'create' => 'Create new store category',
            'update' => 'Update store category details',
            'destroy' => 'Delete store category',
        ],
        'products' => [
            'index' => 'View products list',
            'show' => 'View product details',
            'create' => 'Create new product',
            'update' => 'Update product details',
            'destroy' => 'Delete product',
        ],
        'orders' => [
            'index' => 'View orders list',
            'show' => 'View order details',
            'create' => 'Create new order',
            'update' => 'Update order details',
            'destroy' => 'Delete order',
        ],
        'users' => [
            'index' => 'View users list',
            'show' => 'View user details',
            'create' => 'Create new user',
            'update' => 'Update user details',
            'destroy' => 'Delete user',
        ],
        'transactions' => [
            'index' => 'View transactions list',
        ],
        'wallets' => [
            'index' => 'View wallets list',
        ],
    ],
    'transaction_type' => [
        'deposit_order_total_in_store_wallet' => 'Deposit order total to store wallet',
        'withdraw_platform_fee_from_store_wallet' => 'Withdraw platform fee from store wallet',
        'deposit_platform_fee_to_platform_wallet' => 'Deposit platform fee to platform wallet',
        'deposit_store_subscription_to_platform_wallet' => 'Deposit store subscription to platform wallet',
    ],
];
