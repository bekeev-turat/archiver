import type { SortFilter } from '../store/filters/filters.types'
import type { FileData } from '../store/zip/zip.types'

export const sortStrategies: Record<
	SortFilter,
	(a: FileData, b: FileData) => number
> = {
	nameAsc: (a, b) => {
		const numA = parseInt(a.name, 10)
		const numB = parseInt(b.name, 10)

		if (!isNaN(numA) && !isNaN(numB)) {
			return numA - numB
		}
		return a.name.localeCompare(b.name)
	},

	nameDesc: (a, b) => {
		const numA = parseInt(a.name, 10)
		const numB = parseInt(b.name, 10)

		if (!isNaN(numA) && !isNaN(numB)) {
			return numB - numA
		}
		return b.name.localeCompare(a.name)
	},

	sizeAsc: (a, b) => a.size - b.size,
	sizeDesc: (a, b) => b.size - a.size,
}
