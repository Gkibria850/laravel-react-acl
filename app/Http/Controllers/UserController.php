<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;



class UserController extends Controller
{
    
    public function index()
    {
        
        return Inertia::render("Users/Index",[
           "users" => User::with("roles")->get()
        ]);
    }
    public function create(){
        return Inertia::render("Users/Create", [
            "roles" => Role::pluck('name')
        ]);
    }

   public function store(Request $request)
{
    // 1. Validate the request
    //dd($request->all());
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required', 'string', 'min:8'],
    ]);

    // 2. Create the user
    $user =User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']), // Hash the password
    ]);
    $user->syncRoles($request->roles);
    // 3. Redirect or return response
    return redirect()->route('users.index')->with('success', 'User created successfully.');
}
public function edit(string $id)
{
    $user = User::findOrFail($id); // use findOrFail to fail gracefully if user not found

    return Inertia::render("Users/Edit", [
        "user" => $user,
        "userRoles" => $user->roles()->pluck('name'), // fixed $use to $user
        "roles" => Role::pluck('name'), // returns all role names
    ]);
}


    public function update(Request $request, string $id)
{
    $user = User::findOrFail($id);

    $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255' ],// Rule::unique('users')->ignore($user->id), 
        // 'password' => ['nullable', 'string', 'min:8'],
    ]);

    $user->name = $request->name;
    $user->email = $request->email;

    // if ($request->filled('password')) {
    //     $user->password = Hash::make($request->password);
    // }
    
    if ($request->password) {
        $user->password = Hash::make($request->password);
    }
    $user->save();
    $user->syncRoles($request->roles);

    return redirect()->route('users.index')->with('message', 'User updated successfully.');
}
public function show(string $id)

{
    $user = User::find($id);
    return Inertia::render('Users/Show', [
        'user' => $user,
    ]);
}

public function destroy(string $id)
{
    User::delete($id);

    return redirect()->route('users.index')->with('message', 'User deleted successfully.');
}


}

