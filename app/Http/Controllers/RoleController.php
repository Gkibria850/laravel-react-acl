<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
        public function index()
    {
        
        return Inertia::render("Roles/Index",[
           "roles" => Role::with("permissions")->get()
        ]);
    }
    public function create(){
        return Inertia::render("Roles/Create",[
            "permissions" => Permission::pluck("name")
        ]);
    }

   public function store(Request $request)
{
    $request->validate([
        'name' => 'required',
        'permissions'  => 'required',
    ]);

    $role = Role::create(['name' => $request->name]);
    $role->syncPermissions($request->permissions);

   //dd($request->all());
   return to_route('roles.index');
}
public function edit(string $id)
{
    $role = Role::with('permissions')->findOrFail($id);
    $permissions = Permission::pluck('name');

    return Inertia::render('Roles/Edit', [
        'role' => $role,
        'permissions' => $permissions,
    ]);
}


    public function update(Request $request, string $id)
{
    $role = Role::findOrFail($id);

    $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'permissions' => ['required', 'array'],
        'permissions.*' => ['string', 'exists:permissions,name'],
    ]);

    $role->name = $validated['name'];
    $role->save();
    $role->syncPermissions($validated['permissions']);

    return redirect()->route('roles.index')->with('message', 'Role updated successfully.');
}
public function show(string $id)
{
    $role = Role::with('permissions')->findOrFail($id);

    return Inertia::render('Roles/Show', [
        'role' => $role,
    ]);
}

public function destroy(string $id)
{
    $role = Role::findOrFail($id);
    
    $role->delete();

    return redirect()->route('roles.index')->with('message', 'Role deleted successfully.');
}

}
