<?php

use App\Enums\PanelsEnum;
use Illuminate\Support\Str;

function getPanel()
{
    $path = request()->path();

    foreach (PanelsEnum::cases() as $panel) {
        if (Str::startsWith($path, $panel->value)) {
            return $panel->value;
        }
    }
    return null;
}
function isAdminPanel(): bool
{
    return request()->is([PanelsEnum::ADMIN->value, PanelsEnum::ADMIN->value . '/*']);
}
