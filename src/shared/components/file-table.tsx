import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { Button } from './ui/button'
import { FaDownload } from 'react-icons/fa'
import type { FileData } from '../store/zip/zip.types'

interface FileTableProps {
	files: FileData[]
	onDownload: (url: string, name: string) => void
}

export const FileTable: React.FC<FileTableProps> = ({ files, onDownload }) => {
	// Определяем колонки
	const columns: ColumnDef<FileData>[] = [
		{
			accessorKey: 'name',
			header: 'Имя файла',
			cell: (info) => {
				const value = info.getValue() as string
				return value.length > 30 ? value.slice(0, 30) + '...' : value
			},
		},
		{
			accessorKey: 'type',
			header: 'Тип',
		},
		{
			accessorKey: 'size',
			header: 'Размер (кб)',
			cell: (info) => (info.getValue<number>() / 1024).toFixed(2),
		},
		{
			accessorKey: 'suspiciousReasons',
			header: 'Опасность',
			cell: (info) => {
				const value = info.getValue() as string[]
				return value?.length ? value.join(', ') : 'Нет'
			},
		},
		{
			id: 'actions',
			header: 'Действия',
			cell: ({ row }) => (
				<div className='flex gap-2'>
					<Button
						variant='default'
						onClick={() => onDownload(row.original.url, row.original.name)}
						className='py-0'
					>
						<FaDownload />
					</Button>
					{row.original.type !== 'other' && (
						<Button variant='outline' link={`/view/${row.original.id}`}>
							Просмотр
						</Button>
					)}
				</div>
			),
		},
	]

	// Таблица
	const table = useReactTable({
		data: files,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className='w-full overflow-x-auto mt-4 animate-fadeIn'>
			<table className='w-full border rounded-lg border-border'>
				<thead className='bg-muted'>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className='px-4 py-2 text-left text-sm font-semibold'
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className='border-t hover:bg-gray-50'>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className='px-4 py-2 text-sm'>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
