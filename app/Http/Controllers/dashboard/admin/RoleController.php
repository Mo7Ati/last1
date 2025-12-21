<?php

namespace App\Http\Controllers\dashboard\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\RoleRequest;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        // abort_unless($request->user('admin')->can('roles.index'), 403);

        $roles = Role::withCount('permissions')
            ->when($request->get('tableSearch'), function ($query) use ($request) {
                $query->where('name', 'LIKE', "%{$request->get('tableSearch')}%");
            })
            ->orderBy($request->get('sort', 'id'), $request->get('direction', 'desc'))
            ->paginate($request->get('per_page', 10))
            ->withQueryString();
        return Inertia::render('admin/roles/index', [
            'roles' => RoleResource::collection($roles),
        ]);
    }

    public function create()
    {
        // abort_unless(request()->user('admin')->can('roles.create'), 403);

        $groupedPermissions = Permission::all()
            ->groupBy(fn($p) => explode('.', $p->name)[0] ?? 'other')
            ->map(fn($group) => PermissionResource::collection($group))
            ->toArray();

        return Inertia::render('admin/roles/create', [
            'role' => new RoleResource(new Role()),
            'permissions' => $groupedPermissions,
        ]);
    }

    public function store(RoleRequest $request)
    {
        // abort_unless($request->user('admin')->can('roles.create'), 403);

        $role = Role::create([
            'name' => $request->name,
            'guard_name' => 'admin',
        ]);

        $role->givePermissionTo($request->get('permissions', []));

        return to_route('admin.roles.index')
            ->with('success', __('messages.created_successfully'));
    }

    public function edit($id)
    {
        // abort_unless(request()->user('admin')->can('roles.update'), 403);

        $role = Role::with('permissions')->withCount('permissions')->findOrFail($id);
        $groupedPermissions = Permission::all()
            ->groupBy(fn($p) => explode('.', $p->name)[0] ?? 'other')
            ->map(fn($group) => PermissionResource::collection($group))
            ->toArray();

        return Inertia::render('admin/roles/edit', [
            'role' => new RoleResource($role),
            'permissions' => $groupedPermissions,
        ]);
    }

    public function update($id, RoleRequest $request)
    {
        // abort_unless($request->user('admin')->can('roles.update'), 403);

        $role = Role::where('guard_name', 'admin')->findOrFail($id);
        $role->update([
            'name' => $request->name,
        ]);

        $role->syncPermissions($request->get('permissions', []));

        return to_route('admin.roles.index')
            ->with('success', __('messages.updated_successfully'));
    }

    public function destroy($id)
    {
        // abort_unless(request()->user('admin')->can('roles.destroy'), 403);

        $role = Role::where('guard_name', 'admin')->findOrFail($id);
        $role->delete();

        return to_route('admin.roles.index')
            ->with('success', __('messages.deleted_successfully'));
    }
}
