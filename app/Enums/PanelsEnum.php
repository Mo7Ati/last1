<?php

namespace App\Enums;

enum PanelsEnum: string
{
    case ADMIN = 'admin';
    case STORE = 'store';

    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'Admin',
            self::STORE => 'Store',
        };
    }
}
