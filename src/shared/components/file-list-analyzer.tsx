'use client'

import { FileFilter } from './file-filter'
import { Space } from './ui/space'
import { Button } from './ui/button'
import { cn } from '../lab/utils'
import { Skeleton } from './ui/skeleton'
import { useFilteredFiles } from '../hooks/use-filtered-files'
import { SuspiciousFilesAlert } from './suspicious-files-alert'
import { FileList } from './file-list'

export const FileListAnalyzer: React.FC = () => {
	const { files, loading, clearFiles, stats, page, setPage } =
		useFilteredFiles()

	return (
		<div className='mb-10'>
			<FileFilter stats={stats} loading={loading} />
			<Space h={30} />

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
					<FileList
						page={page}
						setPage={setPage}
						files={files}
						loading={loading}
						limit={20}
					/>
				</>
			)}
		</div>
	)
}
