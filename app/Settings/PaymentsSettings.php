<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class PaymentsSettings extends Settings
{
    public float $platform_fee_percentage;

    public static function group(): string
    {
        return 'payments';
    }
}

