import { useShallow } from 'zustand/shallow'
import { InputSelect } from '../ui/input-select'
import { useFiltersStore } from '../../store/filters/filters.store'
import type { SortFilter } from '../../store/filters/filters.types'

const sortOptions: Record<string, SortFilter> = {
	'Имя по возрастанию': 'nameAsc',
	'Имя по убыванию': 'nameDesc',
	'Размер по возрастанию': 'sizeAsc',
	'Размер по убыванию': 'sizeDesc',
}

export const SortFilterSelector = () => {
	const [sort, setSort] = useFiltersStore(
		useShallow((state) => [state.sort, state.setSort]),
	)

	return (
		<div className='w-full flex gap-1 items-center'>
			Сортировать{' '}
			<InputSelect
				variant='text'
				options={Object.keys(sortOptions)}
				onChange={(value) => setSort(sortOptions[value])}
				defaultValue={Object.keys(sortOptions).find(
					(key) => sortOptions[key] === sort,
				)}
			/>
		</div>
	)
}
