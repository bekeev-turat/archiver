import type { ColumnDef } from '@tanstack/react-table'
import { FileActionsCell } from './file-actions-cell'
import type { FileData } from '@/shared/store/zip/zip.types'
import { Link } from 'react-router-dom'

export const createFileColumns = (
	onDownload: (url: string, name: string) => void,
): ColumnDef<FileData>[] => [
	{
		accessorKey: 'name',
		header: 'Имя файла',
		cell: ({ getValue, row }) => {
			const value = getValue<string>()
			const displayValue =
				value.length > 30 ? value.slice(0, 30) + '...' : value
			return (
				<Link
					to={`/view/${row.original.id}`}
					className='text-primary hover:underline cursor-pointer font-medium'
					title={value}
				>
					{displayValue}
				</Link>
			)
		},
	},
	{
		accessorKey: 'type',
		header: 'Тип',
	},
	{
		accessorKey: 'size',
		header: 'Размер (кб)',
		cell: ({ getValue }) => (getValue<number>() / 1024).toFixed(2),
	},
	{
		accessorKey: 'suspiciousReasons',
		header: 'Опасность',
		cell: ({ getValue }) => {
			const reasons = getValue<string[]>()
			return reasons?.length ? reasons.join(', ') : 'Нет'
		},
	},
	{
		id: 'actions',
		header: 'Действия',
		cell: ({ row }) => (
			<FileActionsCell
				url={row.original.url}
				name={row.original.name}
				onDownload={onDownload}
			/>
		),
	},
]
