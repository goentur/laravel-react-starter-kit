import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { InfoDataTabel, LinkPagination } from '@/types'

interface props {
    infoDataTabel: InfoDataTabel
    setInfoDataTabel: React.Dispatch<React.SetStateAction<any>>
    linksPagination: LinkPagination[]
}

export default function DataTablePagination({
    infoDataTabel,
    setInfoDataTabel,
    linksPagination,
}: props) {
    return (
        <div className="flex justify-between items-center mt-4">
            <span className="text-sm">
                Menampilkan {infoDataTabel.from} sampai {infoDataTabel.to} dari {infoDataTabel.total} data
            </span>
            <div className="flex items-center space-x-1">
                <Pagination>
                    <PaginationContent>
                        {linksPagination.map((item, index) => (
                            <PaginationItem key={index}>
                                {item.label.includes('Previous') ? (
                                    <PaginationPrevious
                                        disabled={!item.url}
                                        onClick={() =>
                                            setInfoDataTabel((prev: any) => ({
                                                ...prev,
                                                page: prev.page - 1,
                                            }))
                                        }
                                    />
                                ) : item.label.includes('Next') ? (
                                    <PaginationNext
                                        onClick={() =>
                                            setInfoDataTabel((prev: any) => ({
                                                ...prev,
                                                page: prev.page + 1,
                                            }))
                                        }
                                        disabled={!item.url}
                                    />
                                ) : item.label === '...' ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        isActive={item.active}
                                        onClick={() =>
                                            setInfoDataTabel((prev: any) => ({
                                                ...prev,
                                                page: Number(item.label),
                                            }))
                                        }
                                    >
                                        {item.label}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}
