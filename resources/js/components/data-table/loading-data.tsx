import { DatabaseBackup, Loader2 } from 'lucide-react'

export default function LoadingData({colSpan}:{colSpan:number}) {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin me-2" size={18}/> Mohon Tunggu...
                </div>
            </td>
        </tr>
    )
}
