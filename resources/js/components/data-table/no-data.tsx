import { DatabaseBackup } from 'lucide-react'

export default function NoData({colSpan}:{colSpan:number}) {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="flex items-center justify-center">
                    <DatabaseBackup size={18} className="me-2" /> Data tidak ditemukan
                </div>
            </td>
        </tr>
    )
}
