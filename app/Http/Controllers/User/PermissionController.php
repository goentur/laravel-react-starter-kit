<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\DataRequest;
use App\Http\Requests\User\Permission\StoreRequest;
use App\Http\Requests\User\Permission\UpdateRequest;
use App\Models\Permission;
use App\Repositories\User\PermissionRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PermissionController extends Controller implements HasMiddleware
{
    protected PermissionRepository $repository;

    public function __construct(PermissionRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:permission-index', only: ['index', 'data']),
            new Middleware('can:permission-create', only: ['store']),
            new Middleware('can:permission-update', only: ['update']),
            new Middleware('can:permission-delete', only: ['destroy']),
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('permission-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('permission-create'),
                'update' => $user->can('permission-update'),
                'delete' => $user->can('permission-delete'),
            ];
        });
    }

    public function index()
    {
        $gate = $this->gate();
        return inertia('user/permission/index', compact("gate"));
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

    public function update(UpdateRequest $request, Permission $permission)
    {
        $this->repository->update($permission->uuid, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    public function destroy(Permission $permission)
    {
        $this->repository->delete($permission->uuid);
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
