import { useShallow } from 'zustand/shallow'
import { useFiltersStore } from '../../store/filters/filters.store'
import type { FileStats } from '../../lab/file-analyzer'
import { Skeleton } from '../ui/skeleton'
import { cn } from '../../utils/cn'
import type { TypeFilter } from '../../@types/filter'

interface Props {
	stats: FileStats
	loading: boolean
}

export const TypeFilterSelector = ({ stats, loading }: Props) => {
	const { hasImage, hasVideo, hasText, hasOther } = stats
	const [typeFilter, setTypeFilter] = useFiltersStore(
		useShallow((state) => [state.type, state.setType]),
	)

	const fileTypes = [
		{
			hasType:
				(hasImage && hasVideo) ||
				(hasVideo && hasOther) ||
				(hasImage && hasOther) ||
				(hasImage && hasText) ||
				(hasVideo && hasText) ||
				(hasText && hasOther),
			label: 'Все',
			value: 'all',
		},
		{ hasType: hasImage, label: 'Изображения', value: 'image' },
		{ hasType: hasVideo, label: 'Видео', value: 'video' },
		{ hasType: hasText, label: 'Текст', value: 'text' },
		{ hasType: hasOther, label: 'Другие', value: 'other' },
	]

	if (loading) {
		return (
			<>
				{[...Array(4)].map((_, i) => (
					<Skeleton key={i} className='w-36 h-10' />
				))}
			</>
		)
	}

	return (
		<>
			{fileTypes.map((type) => {
				if (!type.hasType) return null
				return (
					<span
						key={type.label}
						onClick={() => setTypeFilter(type.value as TypeFilter)}
						className={cn(
							'cursor-pointer px-4 py-2 rounded-md transition-colors text-base',
							typeFilter === type.value
								? 'bg-gray-700 text-white'
								: 'bg-gray-200 text-black hover:bg-gray-100',
						)}
					>
						{type.label}
					</span>
				)
			})}
		</>
	)
}
