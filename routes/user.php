<?php

use App\Http\Controllers\User\PermissionController;
use App\Http\Controllers\User\RoleController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth', 'verified')->group(function () {
    Route::controller(PermissionController::class)->prefix('permission')->name('permission.')->group(function () {
        Route::middleware('can:permission-index')->post('data', 'data')->name('data');
        Route::post('list', 'list')->name('list');
    });
    Route::controller(RoleController::class)->prefix('role')->name('role.')->group(function () {
        Route::middleware('can:role-index')->post('data', 'data')->name('data');
        Route::post('list', 'list')->name('list');
    });
    Route::resource('permission', PermissionController::class);
    Route::resource('role', RoleController::class);
});
