'use client'

import { useFilteredFiles } from '../hooks/use-filtered-files'
import { FileFilter } from './file-filter'
import { FileCard } from './shared/file-card'
import { Space } from './shared/space'
import { FileTypes } from './shared/file-types'
import { Button } from './shared/button'
import { cn } from '../lab/utils'
import { Skeleton } from './shared/skeleton'
import { useZipPreview } from '../store/zip-store'

export const FileListAnalyzer: React.FC = () => {
	const stats = useZipPreview((state) => state.stats)

	const { files, loading, clearFiles } = useFilteredFiles()

	const downloadFile = (url: string, name: string) => {
		const a = document.createElement('a')
		a.href = url
		a.download = name
		a.click()
	}

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

			{/* {!loading && files.length === 0 && (
				<p className='text-2xl text-center mx-32'>Файлы не найдены.</p>
			)} */}

			{files.length > 0 && (
				<>
					<FileTypes
						hasImage={stats.hasImage}
						hasVideo={stats.hasVideo}
						hasOther={stats.hasOther}
						filesLength={files.length}
					/>
					{stats.suspiciousFiles.length > 0 ? (
						<div className='bg-red-100 p-3 rounded-lg mt-2'>
							<p className='font-semibold text-red-700'>
								⚠️ Найдены подозрительные файлы:
							</p>
							<ul className='list-disc list-inside text-red-600'>
								{stats.suspiciousFiles.map((f, i) => (
									<li key={i}>
										<b>{f.name}</b> — {f.suspiciousReasons?.join(', ')}
									</li>
								))}
							</ul>
						</div>
					) : (
						<p className='bg-green-100 p-5 rounded-lg text-green-600 font-medium mt-2'>
							✅ Подозрительных файлов не найдено
						</p>
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
