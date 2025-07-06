<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

///users permission
    Route::resource('users', UserController::class)
    ->only(["create","store"])
    ->middleware("permission:users.create");
    Route::resource('users', RoleController::class)
    ->only(["edit","update"])
    ->middleware("permission:users.edit");
    Route::resource('users', RoleController::class)
    ->only(["destroy"])
    ->middleware("permission:users.delete");
    Route::resource('users', RoleController::class)
    ->only(["index", "show"])
    ->middleware("permission:users.show|users.create| users.edit|users:delete");
///roles permission
    Route::resource('roles', RoleController::class)
    ->only(["create","store"])
    ->middleware("permission:roles.create");
    Route::resource('roles', RoleController::class)
    ->only(["edit","update"])
    ->middleware("permission:roles.edit");
    Route::resource('roles', RoleController::class)
    ->only(["destroy"])
    ->middleware("permission:roles.delete");
    Route::resource('roles', RoleController::class)
    ->only(["index", "show"])
    ->middleware("permission:roles.show|roles.create| roles.edit|roles:delete");
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
