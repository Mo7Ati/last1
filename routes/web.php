<?php

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

$settingsRoutes = require base_path('routes/settings.php');

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');



Route::middleware(['auth:store'])->group(function () {
    Route::get('store', function () {
        return Inertia::render('store/dashboard');
    })->name('store.dashboard');
});


// Store routes
Route::prefix('store')
    ->name('store.')
    ->middleware(['auth:store'])
    ->group($settingsRoutes);

Route::get('language/{locale}', function ($locale) {
    $supportedLocales = config('app.supported_locales');

    if (!in_array($locale, $supportedLocales)) {
        $locale = config('app.locale', 'en');
    }

    app()->setLocale($locale);

    return redirect()->back()->withCookie(cookie('locale', $locale, 60 * 24 * 365));
});

// Route::post('/stripe/webhook', [StripeWebhookController::class, 'handle'])
//     ->name('stripe.webhook');

// API routes for temporary file uploads
Route::prefix('api/temp-uploads')
    ->name('api.temp-uploads.')
    ->middleware(['auth:admin,store'])
    ->group(function () {
        Route::post('/', [App\Http\Controllers\Api\TempUploadController::class, 'store'])->name('store');
        Route::delete('/', [App\Http\Controllers\Api\TempUploadController::class, 'revert'])->name('revert');
        Route::get('/{id}/{file_name}', [App\Http\Controllers\Api\TempUploadController::class, 'load'])->name('load');
        Route::delete('/{id}/{file_name}', [App\Http\Controllers\Api\TempUploadController::class, 'remove'])->name('remove');
    });

require __DIR__ . '/settings.php';
require __DIR__ . '/dashboard/admin.php';
require __DIR__ . '/dashboard/store.php';
