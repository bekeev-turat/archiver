import { useSortFilter } from '@/shared/hooks/use-sort-filter'
import type { SortFilter } from '../../store/filters/filters.types'
import {
	MenubarSeparator,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSub,
	MenubarSubTrigger,
	MenubarSubContent,
} from '@/shared/components/ui/menubar'
import { sortOptions } from '@/shared/constants/sort'

interface SortFilterSelectorProps {
	sort: SortFilter
	setSort: (value: SortFilter) => void
}

export const SortFilterSelector = ({
	sort,
	setSort,
}: SortFilterSelectorProps) => {
	const { field, direction, handleFieldChange, handleDirectionChange } =
		useSortFilter(sort, setSort)
	return (
		<MenubarSub>
			<MenubarSubTrigger>Сортировать</MenubarSubTrigger>
			<MenubarSubContent>
				<MenubarRadioGroup value={field} onValueChange={handleFieldChange}>
					{Object.entries(sortOptions).map(([key, label]) => (
						<MenubarRadioItem key={key} value={key}>
							{label}
						</MenubarRadioItem>
					))}
				</MenubarRadioGroup>

				<MenubarSeparator />

				<MenubarRadioGroup
					value={direction}
					onValueChange={handleDirectionChange}
				>
					<MenubarRadioItem value='Asc'>По возрастанию</MenubarRadioItem>
					<MenubarRadioItem value='Desc'>По убыванию</MenubarRadioItem>
				</MenubarRadioGroup>
			</MenubarSubContent>
		</MenubarSub>
	)
}
