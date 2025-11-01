'use client'

import { useFilteredFiles } from '../hooks/use-filtered-files'
import { FileFilter } from './file-filter'
import { FileCard } from './ui/file-card'
import { Space } from './ui/space'
import { FileTypes } from './ui/file-types'
import { Button } from './ui/button'
import { cn } from '../utils/cn'
import { Skeleton } from './ui/skeleton'
import { useZipPreview } from '../store/zip-store'
import { downloadFile } from '../utils/downloadFile'
import { SuspiciousFilesAlert } from './suspicious-files-alert'

export const FileListAnalyzer: React.FC = () => {
	const stats = useZipPreview((state) => state.stats)

	const { files, loading, clearFiles } = useFilteredFiles()

	return (
		<div>
			<FileFilter
				hasImage={stats.hasImage}
				hasVideo={stats.hasVideo}
				hasOther={stats.hasOther}
				loading={loading}
			/>
			<Space h={30} />

			{loading && (
				<>
					<Skeleton className='h-32 w-2xs mb-4 rounded-lg' />
					<Skeleton className='h-16 mb-4 rounded-lg' />
					<Button
						variant='secondary'
						className='opacity-50 pointer-events-none'
					>
						Очистить
					</Button>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full mt-4'>
						{[...Array(8)].map((_, i) => (
							<Skeleton key={i} className='h-96 w-[300px] mb-4 rounded-lg' />
						))}
					</div>
				</>
			)}

			{files.length > 0 && (
				<>
					<FileTypes
						hasImage={stats.hasImage}
						hasVideo={stats.hasVideo}
						hasOther={stats.hasOther}
						filesLength={files.length}
					/>
					<SuspiciousFilesAlert suspicious={stats.suspiciousFiles} />
					<Space h={20} />
					<Button
						variant='secondary'
						onClick={clearFiles}
						className={cn({
							'opacity-50 pointer-events-none': loading || files.length === 0,
						})}
					>
						Очистить
					</Button>

					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full mt-4'>
						{!loading &&
							files.map((file, i) => (
								<FileCard key={i} file={file} onDownload={downloadFile} />
							))}
					</div>
				</>
			)}
		</div>
	)
}
