<?php

namespace App\Http\Controllers\dashboard\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\AdminProfileUpdateRequest;
use App\Http\Resources\AdminResource;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AdminSettingsController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function profile(Request $request): Response
    {
        return Inertia::render('admin/settings/profile', [
            'admin' => Auth::guard('admin')->user(),
            'mustVerifyEmail' => true,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function profileUpdate(AdminProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at ? $request->user()->email_verified_at = null : null;
        }

        $request->user()->save();

        return to_route('admin.settings.profile');
    }

    /**
     * Delete the user's account.
     */
    // public function destroy(Request $request): RedirectResponse
    // {
    //     $request->validate([
    //         'password' => ['required', 'current_password'],
    //     ]);

    //     $user = $request->user();

    //     Auth::logout();

    //     $user->delete();

    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();

    //     return redirect('/');
    // }
}
