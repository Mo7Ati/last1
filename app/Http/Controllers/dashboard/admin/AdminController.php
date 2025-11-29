<?php

namespace App\Http\Controllers\dashboard\admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/admins/index', [
            'admins' => Admin::all(),
        ]);
    }
    public function create()
    {
        return Inertia::render('admin.create');
    }
    public function store(Request $request)
    {
        return Inertia::render('admin.store');
    }
    public function edit($id)
    {
        return Inertia::render('admin.edit');
    }
    public function update(Request $request, $id)
    {
        return Inertia::render('admin.update');
    }
    public function destroy($id)
    {
        return Inertia::render('admin.destroy');
    }
}
