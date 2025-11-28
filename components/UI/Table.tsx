import { useState } from "react"
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react"

type SortDescriptor = {
    column: string
    direction: 'ascending' | 'descending'
}

type TableColumnDef<T> = {
    key: string
    header: string
    sortable?: boolean
    alignColumn?: 'start' | 'center' | 'end'
    alignCell?: 'start' | 'center' | 'end'
    classCell?: string
    classColumn?: string
    renderCell?: (item: T) => React.ReactNode
}

interface TableProps<T> {
    data: T[]
    columns: TableColumnDef<T>[]
    sortDescriptor?: SortDescriptor
    onSortChange?: (descriptor: SortDescriptor) => void
    selectable?: boolean
    selectedKeys?: Set<number>
    onSelectionChange?: (keys: Set<number>) => void
}

export default function Table<T>({
    columns,
    data,
    sortDescriptor,
    onSortChange,
    selectable = false,
    selectedKeys,
    onSelectionChange
}: TableProps<T>) {
    const [sort, setSort] = useState<SortDescriptor | undefined>(sortDescriptor)
    const [internalSelectedKeys, setInternalSelectedKeys] = useState<Set<number>>(new Set())
    
    const currentSelectedKeys = selectedKeys !== undefined ? selectedKeys : internalSelectedKeys

    const handleSort = (columnKey: string) => {
        let newSort: SortDescriptor
        if (sort?.column === columnKey) {
            // Toggle direction if same column
            newSort = {
                column: columnKey,
                direction: sort.direction === 'ascending' ? 'descending' : 'ascending'
            }
        } else {
            // New column, default to descending
            newSort = {
                column: columnKey,
                direction: 'descending'
            }
        }
        setSort(newSort)
        if (onSortChange) {
            onSortChange(newSort)
        }
    }

    const handleSelectAll = (checked: boolean) => {
        const newSelection = checked ? new Set(data.map((_, index) => index)) : new Set<number>()
        
        if (selectedKeys !== undefined && onSelectionChange) {
            onSelectionChange(newSelection)
        } else {
            setInternalSelectedKeys(newSelection)
        }
    }

    const handleSelectRow = (rowIndex: number, checked: boolean) => {
        const newSelection = new Set(currentSelectedKeys)
        
        if (checked) {
            newSelection.add(rowIndex)
        } else {
            newSelection.delete(rowIndex)
        }
        
        if (selectedKeys !== undefined && onSelectionChange) {
            onSelectionChange(newSelection)
        } else {
            setInternalSelectedKeys(newSelection)
        }
    }

    const isAllSelected = data.length > 0 && currentSelectedKeys.size === data.length
    const isSomeSelected = currentSelectedKeys.size > 0 && currentSelectedKeys.size < data.length



    return (
        <table className="w-full select-none rounded-lg">
            <thead>
                <tr className="bg-gray-100 shadow-md">
                    {selectable && (
                        <th className="p-1 w-12">
                            <div className="flex items-center justify-center py-2">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    ref={input => {
                                        if (input) {
                                            input.indeterminate = isSomeSelected
                                        }
                                    }}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    className="w-4 h-4 cursor-pointer"
                                />
                            </div>
                        </th>
                    )}
                    {columns.map((col) => (
                        <th key={col.key} className="p-1">
                            <div className="flex items-center justify-start gap-2 py-2 font-normal">
                                {col.header}
                                {col.sortable && (
                                    <button 
                                        onClick={() => handleSort(col.key)} 
                                        className="hover:text-blue-600 transition-colors cursor-pointer"
                                    >
                                        {sort?.column === col.key ? (
                                            sort.direction === 'ascending' ? (
                                                <ArrowUpNarrowWide className="w-4 h-4" />
                                            ) : (
                                                <ArrowDownNarrowWide className="w-4 h-4" />
                                            )
                                        ) : (
                                            <ArrowUpNarrowWide className="w-4 h-4 opacity-30" />
                                        )}
                                    </button>
                                )}
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white rounded font-light text-sm">
                {data.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {selectable && (
                            <td className="py-1 border-b border-gray-200 text-center">
                                <input
                                    type="checkbox"
                                    checked={currentSelectedKeys.has(rowIndex)}
                                    onChange={(e) => handleSelectRow(rowIndex, e.target.checked)}
                                    className="w-4 h-4 cursor-pointer"
                                />
                            </td>
                        )}
                        {columns.map((col) => (
                            <td  
                                key={col.key}  
                                className={`${col.classCell ? col.classCell : ''} py-1 border-b border-gray-200 `}
                            >
                                {col.renderCell ? col.renderCell(item) : (item as any)[col.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}