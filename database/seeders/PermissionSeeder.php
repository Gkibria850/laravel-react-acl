<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
{
    $permissions = [
        "users.view",
        "users.edit",
        "users.delete",
        "users.create",
        "roles.view",
        "roles.edit",
        "roles.delete",
        "roles.create",
    ];

    // foreach ($permissions as $permission) {
    //     \Spatie\Permission\Models\Permission::firstOrCreate(['name' => $permission]);
    // }
    
    // foreach ($permissions as $key=> $value) {
    //     Permission::create(['name' => $value]);
    // }

       foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }
    }
}


