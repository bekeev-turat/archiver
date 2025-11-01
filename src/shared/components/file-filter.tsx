import { useShallow } from 'zustand/shallow'
import { useFilters } from '../store/filters'
import type { FileType } from '../@types/file-data'
import { cn } from '../lab/utils'

const fileTypes = [
	{ label: 'Все', value: ['image', 'video', 'other'] },
	{ label: 'Изображения', value: ['image'] },
	{ label: 'Видео', value: ['video'] },
	{ label: 'Другие', value: ['other'] },
]

export const FileFilter = () => {
	const [filters, setFilters] = useFilters(
		useShallow((state) => [state.filters, state.setFilters]),
	)

	return (
		<div className='flex gap-2 flex-wrap'>
			<p className='w-full font-semibold mb-2 text-2xl'>Фильтры</p>
			{fileTypes.map((type) => {
				const isActive =
					filters.length === type.value.length &&
					type.value.every((v) => filters.includes(v as FileType))

				return (
					<span
						key={type.label}
						onClick={() => setFilters(type.value as FileType[])}
						className={cn(
							'cursor-pointer px-3 py-1 rounded-md transition-colors text-base',
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
