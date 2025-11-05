import { sortOptions } from "../constants/sort"
import type { SortFilter } from "../store/filters/filters.types"

export function useSortFilter(sort: SortFilter, setSort: (value: SortFilter) => void) {
	const [field, direction] = (() => {
		if (!sort) return [undefined, undefined]
		const match = sort.match(/^(.*?)(Asc|Desc)$/)
		return match ? [match[1], match[2]] : [undefined, undefined]
	})()

	const handleFieldChange = (newField: string) => {
		setSort(`${newField}${direction || 'Asc'}` as SortFilter)
	}

	const handleDirectionChange = (newDir: string) => {
		setSort(`${field || Object.keys(sortOptions)[0]}${newDir}` as SortFilter)
	}

	return { field, direction, handleFieldChange, handleDirectionChange }
}