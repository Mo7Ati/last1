<?php

namespace App\Http\Controllers\dashboard\store;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\Exception\ApiErrorException;
use Stripe\Stripe;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        $store = Auth::guard('store')->user();
        $plans = config('subscription.plans');

        // Format plans for frontend
        $formattedPlans = collect($plans)->map(function ($plan) {
            return [
                'id' => $plan['id'],
                'name' => $plan['name'],
                'price' => $plan['price'],
                'interval' => $plan['interval'],
                'stripe_price_id' => $plan['stripe_price_id'],
                'features' => $plan['features'],
            ];
        })->values();

        return Inertia::render('store/subscription/index', [
            'store' => [
                'has_subscription' => $store->subscribed(),
                'on_trial' => $store->onTrial(),
                'trial_ends_at' => $store->trialEndsAt() ? $store->trialEndsAt()->format('Y-m-d') : null,
                'remaining_trial_days' => $store->trialEndsAt()?->diffInDays(),
                'subscription' => $store->subscription() ? [
                    'name' => $store->subscription()->stripe_price == config('subscription.plans.monthly.stripe_price_id') ? 'Monthly' : 'Yearly',
                    'stripe_status' => $store->subscription()->stripe_status,
                    'ends_at' => $store->subscription()->ends_at?->toIso8601String(),
                ] : null,
            ],
            'plans' => $formattedPlans,
        ]);
    }
    // $store->subscription ? [
    //     'name' => $store->subscription->name,
    //     'stripe_status' => $store->subscription->stripe_status,
    //     'ends_at' => $store->subscription->ends_at?->toIso8601String(),
    // ] :

    public function checkout(Request $request)
    {
        $request->validate([
            'plan' => ['required', 'in:monthly,yearly'],
        ]);

        $store = Auth::guard('store')->user();
        $plan = config("subscription.plans.{$request->plan}");

        if (!$plan || !$plan['stripe_price_id']) {
            return response()->json([
                'error' => 'Invalid plan selected',
            ], 400);
        }

        try {
            $subscription = $store
                ->newSubscription('default', $plan['stripe_price_id'])
                ->trialDays(config('subscription.trial_days'))
                ->allowPromotionCodes()
                ->checkout([
                    'success_url' => route('store.subscription.success'),
                    'cancel_url' => route('store.subscription.index'),
                ]);

            return Inertia::location($subscription->url);

        } catch (ApiErrorException $e) {
            dd($e->getMessage());
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function success(Request $request)
    {
        $sessionId = $request->get('session_id');

        if (!$sessionId) {
            return redirect()->route('store.subscription.index')->with('error', 'Invalid session');
        }

        try {
            $session = $this->stripe->checkout->sessions->retrieve($sessionId);

            if ($session->payment_status === 'paid') {
                // Handle subscription creation via webhook
                // For now, just redirect with success message
                return redirect()->route('store.subscription.index')
                    ->with('success', 'Subscription activated successfully!');
            }

            return redirect()->route('store.subscription.index')
                ->with('error', 'Payment was not completed');
        } catch (ApiErrorException $e) {
            return redirect()->route('store.subscription.index')
                ->with('error', 'Failed to verify subscription');
        }
    }

    public function cancel(Request $request)
    {
        $store = $request->user('store');

        if (!$store->subscription || !$store->subscription->stripe_id) {
            return redirect()->route('store.subscription.index')
                ->with('error', 'No active subscription found');
        }

        try {
            $subscription = $this->stripe->subscriptions->retrieve($store->subscription->stripe_id);
            $this->stripe->subscriptions->cancel($subscription->id);

            return redirect()->route('store.subscription.index')
                ->with('success', 'Subscription canceled successfully');
        } catch (ApiErrorException $e) {
            return redirect()->route('store.subscription.index')
                ->with('error', 'Failed to cancel subscription: ' . $e->getMessage());
        }
    }

    public function resume(Request $request)
    {
        $store = $request->user('store');

        if (!$store->subscription || !$store->subscription->stripe_id) {
            return redirect()->route('store.subscription.index')
                ->with('error', 'No subscription found');
        }

        try {
            $subscription = $this->stripe->subscriptions->retrieve($store->subscription->stripe_id);

            if ($subscription->cancel_at_period_end) {
                $this->stripe->subscriptions->update($subscription->id, [
                    'cancel_at_period_end' => false,
                ]);

                return redirect()->route('store.subscription.index')
                    ->with('success', 'Subscription resumed successfully');
            }

            return redirect()->route('store.subscription.index')
                ->with('error', 'Subscription is not scheduled for cancellation');
        } catch (ApiErrorException $e) {
            return redirect()->route('store.subscription.index')
                ->with('error', 'Failed to resume subscription: ' . $e->getMessage());
        }
    }

    public function billing(Request $request)
    {
        $store = Auth::guard('store')->user();

        try {
            return Inertia::location($store->redirectToBillingPortal(route('store.subscription.index')));
        } catch (ApiErrorException $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
