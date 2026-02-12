<?php

namespace App\Http\Controllers\dashboard\admin;

use App\Enums\TransactionTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        // abort_unless($request->user('admin')->can(PermissionsEnum::TRANSACTIONS_INDEX->value), 403);

        $transactions = Transaction::query()
            ->with(['wallet', 'payable', 'source'])
            ->when($request->get('explanation'), function ($query) use ($request) {
                $query->whereJsonContains('meta->type', $request->get('explanation'));
            })
            ->orderBy($request->get('sort', 'created_at'), $request->get('direction', 'desc'))
            ->paginate($request->get('per_page', 10))
            ->withQueryString();

        return Inertia::render('admin/transactions/index', [
            'transactions' => TransactionResource::collection($transactions),
        ]);
    }

    public function subscriptionsTransactions(Request $request)
    {
        $transactions = Transaction::query()
            ->where('meta->type', TransactionTypeEnum::DEPOSIT_STORE_SUBSCRIPTION_TO_PLATFORM_WALLET->value)
            ->orderBy($request->get('sort', 'created_at'), $request->get('direction', 'desc'))
            ->paginate($request->get('per_page', 10))
            ->withQueryString();

        return Inertia::render('admin/transactions/subscriptions-transactions', [
            'transactions' => TransactionResource::collection($transactions),
        ]);
    }
}
