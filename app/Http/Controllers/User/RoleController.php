<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\DataRequest;
use App\Http\Requests\User\Role\StoreRequest;
use App\Http\Requests\User\Role\UpdateRequest;
use App\Models\Role;
use App\Repositories\User\RoleRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class RoleController extends Controller implements HasMiddleware
{
    protected RoleRepository $repository;

    public function __construct(RoleRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:role-index', only: ['index', 'data']),
            new Middleware('can:role-create', only: ['store']),
            new Middleware('can:role-update', only: ['update']),
            new Middleware('can:role-delete', only: ['destroy']),
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('role-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('role-create'),
                'update' => $user->can('role-update'),
                'delete' => $user->can('role-delete'),
            ];
        });
    }

    public function index()
    {
        $gate = $this->gate();
        return inertia('user/role/index', compact("gate"));
    }

    public function create()
    {
        abort(404);
    }

    public function store(StoreRequest $request)
    {
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    public function show(string $id)
    {
        abort(404);
    }

    public function edit(string $id)
    {
        abort(404);
    }

    public function update(UpdateRequest $request, Role $role)
    {
        $this->repository->update($role->uuid, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    public function destroy(Role $role)
    {
        $this->repository->delete($role->uuid);
        back()->with('success', 'Data berhasil dihapus');
    }

    public function data(DataRequest $request)
    {
        return response()->json($this->repository->data($request));
    }

    public function list()
    {
        return response()->json($this->repository->list(), 200);
    }
}
