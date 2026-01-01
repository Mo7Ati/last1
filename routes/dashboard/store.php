<?php

use App\Http\Controllers\dashboard\store\AdditionController;
use App\Http\Controllers\dashboard\store\CategoryController;
use App\Http\Controllers\dashboard\store\DashboardController;
use App\Http\Controllers\dashboard\store\GeneralSettingsController;
use App\Http\Controllers\dashboard\store\OptionController;
use App\Http\Controllers\dashboard\store\OrderController;
use App\Http\Controllers\dashboard\store\ProductController;
use Illuminate\Support\Facades\Route;

// settings routes
Route::prefix('store')
    ->name('store.')
    ->middleware(['auth:store'])
    ->group($settingsRoutes);


Route::middleware(['auth:store'])
    ->prefix('store')
    ->name('store.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('index');
        Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');


        Route::resources([
            'products' => ProductController::class,
            'categories' => CategoryController::class,
            'additions' => AdditionController::class,
            'options' => OptionController::class,
        ]);


        Route::prefix('settings')->name('settings.')->group(function () {
            Route::get('/general', [GeneralSettingsController::class, 'general'])->name('general');
            Route::put('/general', [GeneralSettingsController::class, 'generalUpdate'])->name('general.update');



        });
    });
