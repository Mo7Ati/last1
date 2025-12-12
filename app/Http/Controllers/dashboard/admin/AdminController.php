<?php

namespace App\Http\Controllers\dashboard\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminResource;
use App\Models\Admin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $admins = Admin::query()
            ->search($request->get('tableSearch'))
            ->when($request->get('is_active') !== null, function ($query) use ($request) {
                $query->where('is_active', $request->get('is_active'));
            })
            ->orderBy($request->get('sort', 'id'), $request->get('direction', 'desc'))
            ->paginate($request->get('per_page', 10))
            ->withQueryString();

        return Inertia::render('admin/admins/index', [
            'admins' => AdminResource::collection($admins),
        ]);
    }
    public function create()
    {
        return Inertia::render('admin/admins/create');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|string|min:8',
            'is_active' => 'nullable|boolean',
        ]);

        // Convert string '1'/'0' to boolean if needed
        if (isset($validated['is_active'])) {
            $validated['is_active'] = (bool) $validated['is_active'];
        } else {
            $validated['is_active'] = true;
        }

        $admin = Admin::create($validated);
        return redirect()->route('admin.admins.index')->with('success', 'Admin created successfully');
    }
    public function edit($id)
    {
        $admin = Admin::findOrFail($id);
        return Inertia::render('admin/admins/edit', [
            'admin' => new AdminResource($admin),
        ]);
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email,' . $id,
            'password' => 'nullable|string|min:8',
            'is_active' => 'nullable|boolean',
        ]);

        // Remove password from update if it's empty
        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        // Convert string '1'/'0' to boolean if needed
        if (isset($validated['is_active'])) {
            $validated['is_active'] = (bool) $validated['is_active'];
        }

        $admin = Admin::findOrFail($id);
        $admin->update($validated);
        return redirect()->route('admin.admins.index')->with('success', 'Admin updated successfully');
    }
    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);
        $admin->delete();
        return redirect()->route('admin.admins.index')->with('success', 'Admin deleted successfully');
    }
}
