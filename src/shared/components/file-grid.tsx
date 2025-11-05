import type { FileData } from '@/shared/store/zip/zip.types'
import { Skeleton } from './ui/skeleton'
import { FileCard } from './ui/file-card'

interface FileGridProps {
	files: FileData[]
	loading: boolean
	onDownload: (url: string, name: string) => void
}

export function FileGrid({ files, loading, onDownload }: FileGridProps) {
	if (loading) {
		return (
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full mt-4'>
				{[...Array(8)].map((_, i) => (
					<Skeleton key={i} className='h-96 w-[300px] mb-4 rounded-lg' />
				))}
			</div>
		)
	}

	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full mt-4'>
			{files.map((file, i) => (
				<FileCard key={i} file={file} onDownload={onDownload} />
			))}
		</div>
	)
}
