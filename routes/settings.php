<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth', 'verified')->group(function () {
    Route::redirect('settings', 'settings/profile');
    Route::controller(ProfileController::class)->group(function () {
        Route::get('settings/profile', 'edit')->name('profile.edit');
        Route::patch('settings/profile', 'update')->name('profile.update');
        Route::delete('settings/profile', 'destroy')->name('profile.destroy');
    });
    Route::controller(PasswordController::class)->group(function () {
        Route::get('settings/password', 'edit')->name('password.edit');
        Route::put('settings/password', 'update')->name('password.update');
    });

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});
