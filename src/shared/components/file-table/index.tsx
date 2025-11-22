import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { createFileColumns } from './create-file-columns'
import type { FileData } from '@/shared/store/zip/zip.types'

interface FileTableProps {
	files: FileData[]
	onDownload: (url: string, name: string) => void
}

export const FileTable: React.FC<FileTableProps> = ({ files, onDownload }) => {
	const table = useReactTable({
		data: files,
		columns: createFileColumns(onDownload),
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className='overflow-x-scroll mt-4 animate-fadeIn w-[96vw] md:w-full'>
			<div className='min-w-max'>
				<table className='w-full border rounded-lg border-border'>
					<thead className='bg-muted'>
						{table.getHeaderGroups().map((group) => (
							<tr key={group.id}>
								{group.headers.map((header) => (
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
		</div>
	)
}
