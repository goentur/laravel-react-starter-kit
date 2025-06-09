<?php

namespace App\Repositories\User;

use App\Http\Resources\Common\SelectOptionResource;
use App\Models\Permission;
use Illuminate\Support\Facades\DB;

class PermissionRepository
{
    public function __construct(protected Permission $model) {}

    public function store($request)
    {
        try {
            DB::beginTransaction();
            $permission = $this->model->create([
                'name' => $request->nama,
                'guard_name' => $request->guard_name,
            ]);
            $permission->syncRoles($request->roles);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update($id, $request)
    {
        try {
            DB::beginTransaction();
            $permission = $this->model->findOrFail($id);
            $permission->update([
                'name' => $request->nama,
                'guard_name' => $request->guard_name,
            ]);
            $permission->syncRoles($request->roles);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete($id)
    {
        try {
            DB::beginTransaction();
            $permission = $this->model->findOrFail($id);
            $permission->syncRoles([]);
            $permission->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function data($request)
    {
        return $this->model::select('uuid', 'name', 'guard_name')
            ->with('roles')
            ->when($request->search, function ($q) use ($request) {
            $q->whereLike('name', "%{$request->search}%")
                ->orWhereHas('roles', fn($q) => $q->whereLike('name', "%{$request->search}%"));
            })
            ->latest()->paginate($request->perPage ?? 25);
    }

    public function list()
    {
        return SelectOptionResource::collection($this->model::select('uuid', 'name')->get());
    }
}
