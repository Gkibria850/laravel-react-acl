<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    
    public function index()
    {
        
        return Inertia::render("Users/Index",[
           "users" => User::all()
        ]);
    }
    public function create(){
        return Inertia::render("Users/Create");
    }

   public function store(Request $request)
{
    // 1. Validate the request
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required', 'string', 'min:8'],
    ]);

    // 2. Create the user
    User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => bcrypt($validated['password']), // Hash the password
    ]);

    // 3. Redirect or return response
    return redirect()->route('users.index')->with('success', 'User created successfully.');
}

}
