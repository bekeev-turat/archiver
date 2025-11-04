'use client'

import { useFilteredFiles } from '../hooks/use-filtered-files'
import { FileFilter } from './file-filter'
import { Space } from './ui/space'
import { FileTypes } from './ui/file-types'
import { Button } from './ui/button'
import { cn } from '../utils/cn'
import { Skeleton } from './ui/skeleton'
import { useZipPreview } from '../store/zip-store'
import { SuspiciousFilesAlert } from './suspicious-files-alert'
import { FileList } from './file-list'

export const FileListAnalyzer: React.FC = () => {
	const stats = useZipPreview((state) => state.stats)

	const { files, loading, clearFiles, setFilters } = useFilteredFiles()

	return (
		<div className='mb-10'>
			<FileFilter stats={stats} loading={loading} setFilters={setFilters} />
			<Space h={30} />

			{loading ? (
				<Skeleton className='h-32 w-2xs mb-4 rounded-lg' />
			) : (
				<FileTypes
					hasImage={stats.hasImage}
					hasVideo={stats.hasVideo}
					hasText={stats.hasText}
					hasOther={stats.hasOther}
					filesLength={files.length}
				/>
			)}
			{loading ? (
				<Skeleton className='h-16 mb-4 rounded-lg' />
			) : (
				<SuspiciousFilesAlert suspicious={stats.suspiciousFiles} />
			)}
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

			{files.length > 0 && (
				<>
					<FileList files={files} loading={loading} limit={20} />
				</>
			)}
		</div>
	)
}
