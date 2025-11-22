import { useShallow } from 'zustand/shallow'
import { useFiltersStore } from '../../store/filters/filters.store'
import { Skeleton } from '../ui/skeleton'
import type { FileStats } from '@/shared/store/analyzer/file-analyzer.type'
import type { TypeFilter } from '@/shared/store/filters/filters.types'
import { ButtonGroup } from '../ui/button-group'
import { Button } from '../ui/button'
import { cn } from '@/shared/lab/utils'

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
					<Skeleton key={i} className='min-w-36 h-10' />
				))}
			</>
		)
	}

	return (
		<>
			<ButtonGroup className='animate-fadeIn'>
				{fileTypes.map((type) => {
					if (!type.hasType) return null
					return (
						<Button
							variant={'outline'}
							key={type.label}
							onClick={() => setTypeFilter(type.value as TypeFilter)}
							className={cn(
								typeFilter === type.value &&'bg-secondary text-secondary-foreground'
							)}
						>
							{type.label}
						</Button>
					)
				})}
			</ButtonGroup>
		</>
	)
}