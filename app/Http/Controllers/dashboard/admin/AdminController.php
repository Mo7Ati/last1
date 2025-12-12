<?php

namespace App\Http\Controllers\dashboard\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Admins\AdminRequest;
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
        $admin = new Admin();
        return Inertia::render('admin/admins/create', [
            'admin' => new AdminResource($admin),
        ]);
    }
    public function store(AdminRequest $request)
    {
        Admin::create($request->validated());
        return to_route('admin.admins.index')
            ->with('success', __('messages.created_successfully'));
    }
    public function edit($id)
    {
        $admin = Admin::findOrFail($id);
        return Inertia::render('admin/admins/edit', [
            'admin' => new AdminResource($admin),
        ]);
    }
    public function update($id, AdminRequest $request)
    {
        Admin::findOrFail($id)->update($request->validated());
        return redirect()
            ->route('admin.admins.index')
            ->with('success', __('messages.updated_successfully'));
    }
    public function destroy($id)
    {
        Admin::destroy($id);
        return redirect()
            ->route('admin.admins.index')
            ->with('success', __('messages.deleted_successfully'));
    }
}
