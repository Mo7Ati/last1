<?php

use App\Http\Controllers\Api\HomeController;
use App\Http\Resources\CustomerResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('customer')
    ->group(function () {

        Route::get('/', function (Request $request) {
            $customer = Auth::guard('customer')->user();

            return successResponse(
                $customer ? CustomerResource::make($customer) : null,
                'Customer fetched successfully'
            );
        });

        Route::get('/home', [HomeController::class, 'index'])
            ->name('home.index');

        Route::middleware('auth:sanctum')->group(function () {

        });

    });
