<?php

return [
    'plans' => [
        'monthly' => [
            'id' => 'monthly',
            'name' => 'Monthly Plan',
            'price' => 29.99,
            'interval' => 'month',
            'stripe_price_id' => env('STRIPE_MONTHLY_PRICE_ID'),
            'features' => [
                'Add unlimited products',
                'Manage orders',
                'Customer support',
                'Analytics dashboard',
            ],
        ],
        'yearly' => [
            'id' => 'yearly',
            'name' => 'Yearly Plan',
            'price' => 299.99,
            'interval' => 'year',
            'stripe_price_id' => env('STRIPE_YEARLY_PRICE_ID'),
            'features' => [
                'Add unlimited products',
                'Manage orders',
                'Customer support',
                'Analytics dashboard',
                'Priority support',
                'Save 17% compared to monthly',
            ],
        ],
    ],

    'trial_days' => 7,
];
