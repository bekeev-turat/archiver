'use client'

import { useShallow } from 'zustand/shallow'
import { useZipPreview } from '../store/zip-store'
// import type { FileData } from '../@types/file-data'
import { cn } from '../utils/cn'
import { Button } from './ui/button'

export const Statistics = () => {
	const [files, loading, clearFiles] = useZipPreview(
		useShallow((state) => [state.files, state.loading, state.clearFiles]),
	)

	return (
		<div className='w-[250px]'>
			<ul>
				<li className='w-full flex items-center gap-1'>
					Количество <span className='w-full border-b border-dotted'></span>
					{files?.length}
				</li>
				{/* <li className='w-full flex items-center gap-1'>
					Типы <span className='w-full border-b border-dotted'></span>
					{checkFileTypes(files)}
				</li> */}
			</ul>

			<Button
				variant='secondary'
				onClick={clearFiles}
				className={cn({
					'opacity-50 pointer-events-none': loading || files.length === 0,
				})}
			>
				Очистить
			</Button>
		</div>
	)
}

// function checkFileTypes(files: FileData[]) {
// 	const hasImage = files.some((file) => file.type === 'image')
// 	const hasVideo = files.some((file) => file.type === 'video')

// 	if (hasImage && hasVideo) return 'image, video'
// 	if (hasImage) return 'image'
// 	if (hasVideo) return 'video'
// 	return '[_]'
// }
