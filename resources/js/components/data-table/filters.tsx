import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Gate } from '@/types'
import { Plus } from 'lucide-react'
import PerPageSelect from './per-page-select'

type props = {
    gate: Gate
    setInfoDataTabel: React.Dispatch<React.SetStateAction<any>>
    onClick?: () => void
}

export default function DataTableFilters({
    gate,
    setInfoDataTabel,
    onClick
}: props) {
    return (
        <div className="mb-4">
            <div className="grid gap-4 lg:grid-cols-2">
                <div>
                    <PerPageSelect onChange={(value) =>setInfoDataTabel((prev:any) => ({...prev,page: 1,perPage: value}))}/>
                </div>
                <form className="flex items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Masukan kata percarian"
                        autoComplete="off"
                        onChange={(e) => setInfoDataTabel((prev: any) => ({...prev,page: 1,search: e.target.value}))}
                    />
                    {gate.create && (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={onClick}
                        >
                            <Plus /> Tambah
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}
