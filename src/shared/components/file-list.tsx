import type { FileData } from '@/shared/store/zip/zip.types'
import { useMemo } from 'react'
import { FileGrid } from './file-grid'
import { downloadFile } from '@/shared/utils/downloadFile'
import { SmartPagination } from './smart-pagination'
import { FileTable } from './file-table'

interface FileListProps {
	type: string
	files: FileData[]
	loading: boolean
	limit?: number
	page: number
	setPage: (value: number) => void
}

export const FileList = ({
	type,
	files,
	loading,
	limit = 12,
	page,
	setPage,
}: FileListProps) => {
	const totalPages = useMemo(() => Math.ceil(files.length / limit), [files])

	const paginatedFiles = useMemo(() => {
		const start = (page - 1) * limit
		return files.slice(start, start + limit)
	}, [files, page, limit])

	console.log(type)

	return (
		<div className='animate-fadeUpSlow'>
			<p>Количество файлов: {files.length}</p>

			{type !== 'image' ? (
				<FileTable files={paginatedFiles} onDownload={downloadFile} />
			) : (
				<FileGrid
					type={type}
					files={paginatedFiles}
					loading={loading}
					onDownload={downloadFile}
				/>
			)}

			{totalPages > 1 && (
				<SmartPagination
					page={page}
					totalPages={totalPages}
					onChange={setPage}
				/>
			)}
		</div>
	)
}
