import type { FileData } from '@/shared/store/zip/zip.types'
import { useMemo } from 'react'
import { FileGrid } from './file-grid'
import { downloadFile } from '@/shared/utils/downloadFile'
import { SmartPagination } from './smart-pagination'

interface FileListProps {
	files: FileData[]
	loading: boolean
	limit?: number
	page: number
	setPage: (value: number) => void
}

export const FileList = ({
	files,
	loading,
	limit = 12,
	page,
	setPage,
}: FileListProps) => {
	const totalPages = Math.ceil(files.length / limit)

	const paginatedFiles = useMemo(() => {
		const start = (page - 1) * limit
		return files.slice(start, start + limit)
	}, [files, page, limit])

	return (
		<div>
			<p>Количество файлов: {files.length}</p>

			<FileGrid
				files={paginatedFiles}
				loading={loading}
				onDownload={downloadFile}
			/>

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
