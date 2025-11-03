'use client'

import { useState, useMemo } from 'react'
import { FileCard } from './ui/file-card'
import { Skeleton } from './ui/skeleton'
import { downloadFile } from '../utils/downloadFile'
import { Pagination } from './ui/pagination'
import type { FileData } from '../@types/file-data'

interface FileListType {
	files: FileData[]
	loading: boolean
	limit?: number
}
export const FileList = ({ files, loading, limit = 12 }: FileListType) => {
	const [page, setPage] = useState(1)
	const totalPages = Math.ceil(files.length / limit)

	const paginatedFiles = useMemo(() => {
		const start = (page - 1) * limit
		return files.slice(start, start + limit)
	}, [files, page])

	const handlePrev = () => setPage((p) => Math.max(p - 1, 1))
	const handleNext = () => setPage((p) => Math.min(p + 1, totalPages))

	useMemo(() => {
		setPage(1)
	}, [files])

	return (
		<div>
			{loading && (
				<>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full mt-4'></div>
				</>
			)}

			{files.length > 0 && (
				<>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full mt-4'>
						{loading
							? [...Array(8)].map((_, i) => (
									<Skeleton
										key={i}
										className='h-96 w-[300px] mb-4 rounded-lg'
									/>
							  ))
							: paginatedFiles.map((file, i) => (
									<FileCard key={i} file={file} onDownload={downloadFile} />
							  ))}
					</div>

					{/* ✅ Используем компонент пагинации */}
					<Pagination
						page={page}
						totalPages={totalPages}
						onPrev={handlePrev}
						onNext={handleNext}
					/>
				</>
			)}
		</div>
	)
}
