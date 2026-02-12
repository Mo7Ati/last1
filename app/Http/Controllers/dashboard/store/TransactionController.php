<?php

namespace App\Http\Controllers\dashboard\store;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Store;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $store = $request->user('store');

        $transactions = Transaction::query()
            ->with(['wallet', 'payable', 'source'])
            ->whereHas('wallet', function ($query) use ($store) {
                $query->where('holder_type', Store::class)
                    ->where('holder_id', $store->id);
            })
            ->when($request->get('explanation'), function ($query) use ($request) {
                $query->whereJsonContains('meta->type', $request->get('explanation'));
            })
            ->orderBy($request->get('sort', 'created_at'), $request->get('direction', 'desc'))
            ->paginate($request->get('per_page', 10))
            ->withQueryString();

        return Inertia::render('store/transactions/index', [
            'transactions' => TransactionResource::collection($transactions),
        ]);
    }
}

