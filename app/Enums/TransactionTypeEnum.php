<?php

namespace App\Enums;

enum TransactionTypeEnum: string
{
    case ORDER_STORE_SHARE = 'ORDER_PAYMENT';
    case ORDER_PLATFORM_FEE = 'PLATFORM_SHARE';
    case STORE_SUBSCRIPTION = 'STORE_SUBSCRIPTION';
}

