<?php

namespace App\Repositories\User;

use App\Http\Resources\Common\SelectOptionResource;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class RoleRepository
{
    public function __construct(protected Role $model) {}

    public function store($request)
    {
        try {
            DB::beginTransaction();
            $role = $this->model->create([
                'name' => $request->nama,
            ]);
            $role->givePermissionTo($request->permissions);
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
            $role = $this->model->findOrFail($id);
            $role->update([
                'name' => $request->nama,
            ]);
            $role->syncPermissions($request->permissions);
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
            $role = $this->model->findOrFail($id);
            $role->revokePermissionTo($role->permissions);
            $role->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function data($request)
    {
        return $this->model::select('uuid', 'name')->with('permissions')
            ->when($request->search, function ($q) use ($request) {
            $q->whereLike('name', "%{$request->search}%")
                ->orWhereHas('permissions', fn($q) => $q->whereLike('name', "%{$request->search}%"));
            })
            ->latest()->paginate($request->perPage ?? 25);
    }

    public function list()
    {
        return SelectOptionResource::collection($this->model::select('uuid', 'name')->get());
    }
}
