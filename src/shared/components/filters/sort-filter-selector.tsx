import { useShallow } from 'zustand/shallow'
import { useFilters, type SortFilter } from '../../store/filters-store'
import { InputSelect } from '../ui/input-select'

export const SortFilterSelector = () => {
	const [sortFilter, setSortFilter] = useFilters(
		useShallow((state) => [state.sortFilter, state.setSortFilter]),
	)

	const sortOptions: Record<string, SortFilter> = {
		'Имя по возрастанию': 'nameAsc',
		'Имя по убыванию': 'nameDesc',
		'Размер по возрастанию': 'sizeAsc',
		'Размер по убыванию': 'sizeDesc',
	}

	return (
		<div className='w-96 flex gap-1 items-center'>
			Сортировать{' '}
			<InputSelect
				variant='text'
				options={Object.keys(sortOptions)}
				onChange={(value) => setSortFilter(sortOptions[value])}
				defaultValue={Object.keys(sortOptions).find(
					(key) => sortOptions[key] === sortFilter,
				)}
			/>
		</div>
	)
}
