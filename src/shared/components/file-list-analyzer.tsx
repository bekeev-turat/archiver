import { Space } from './ui/space'
import { Button } from './ui/button'
import { cn } from '../lab/utils'
import { Skeleton } from './ui/skeleton'
import { useFilteredFiles } from '../hooks/use-filtered-files'
import { SuspiciousFilesAlert } from './suspicious-files-alert'
import { FileList } from './file-list'
import { FileFilter } from './filters'

export const FileListAnalyzer: React.FC = () => {
	const {
		files,
		type,
		loading,
		clearFiles,
		stats,
		page,
		setPage,
		suspicious,
		setSuspicious,
		sort,
		setSort,
	} = useFilteredFiles()

	return (
		<div className='mb-10 animate-fadeIn' id='top'>
			<FileFilter
				suspicious={suspicious}
				setSuspicious={setSuspicious}
				sort={sort}
				setSort={setSort}
				stats={stats}
				loading={loading}
			/>
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
						type={type}
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
