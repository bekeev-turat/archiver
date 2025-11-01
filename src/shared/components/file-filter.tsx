import { useShallow } from 'zustand/shallow'
import { useFilters } from '../store/filters'
import type { FileType } from '../@types/file-data'
import { cn } from '../utils/cn'
import { Skeleton } from './ui/skeleton'

interface FileFilterType {
	hasImage: boolean
	hasVideo: boolean
	hasOther: boolean
	loading: boolean
}
export const FileFilter = ({
	hasImage,
	hasVideo,
	hasOther,
	loading,
}: FileFilterType) => {
	const [filters, setFilters] = useFilters(
		useShallow((state) => [state.filters, state.setFilters]),
	)

	const fileTypes = [
		{
			hasType:
				(hasImage && hasVideo) ||
				(hasVideo && hasOther) ||
				(hasImage && hasOther),
			label: 'Все',
			value: ['image', 'video', 'other'],
		},
		{ hasType: hasImage, label: 'Изображения', value: ['image'] },
		{ hasType: hasVideo, label: 'Видео', value: ['video'] },
		{ hasType: hasOther, label: 'Другие', value: ['other'] },
	]

	return (
		<div className='flex gap-2 flex-wrap'>
			<p className='w-full font-semibold mb-2 text-2xl'>Фильтры</p>
			{loading
				? [...Array(4)].map((_, i) => (
						<Skeleton key={i} className='w-36 h-10' />
				  ))
				: fileTypes.map((type) => {
						if (!type.hasType) {
							return null
						}
						const isActive =
							filters.length === type.value.length &&
							type.value.every((v) => filters.includes(v as FileType))

						return (
							<span
								key={type.label}
								onClick={() => setFilters(type.value as FileType[])}
								className={cn(
									'cursor-pointer px-4 py-2 rounded-md transition-colors text-base',
									isActive
										? 'bg-gray-700 text-white'
										: 'bg-gray-200 text-black hover:bg-gray-100',
								)}
							>
								{type.label}
							</span>
						)
				  })}
		</div>
	)
}
