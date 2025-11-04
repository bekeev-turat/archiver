import { create } from 'zustand'
import type { FileData } from '../@types/file-data'
import type { SortFilter, SuspiciousFilter, TypeFilter } from '../@types/filter'



interface FilterStore {
	filteredFiles: FileData[]
	typeFilter: TypeFilter
	suspiciousFilter: SuspiciousFilter
	search: string
	sortFilter: SortFilter

	setTypeFilter: (type: TypeFilter) => void
	setSuspiciousFilter: (filter: SuspiciousFilter) => void
	setSearch: (value: string) => void
	setSortFilter: (sort: SortFilter) => void
	applyFilters: (files: FileData[]) => void
}

export const useFilters = create<FilterStore>((set, get) => ({
	filteredFiles: [],
	typeFilter: 'all',
	suspiciousFilter: 'all',
	search: '',
	sortFilter: 'nameAsc',

	setTypeFilter: (type) => set({ typeFilter: type }),
	setSuspiciousFilter: (filter) => set({ suspiciousFilter: filter }),
	setSearch: (value) => set({ search: value }),
	setSortFilter: (sort) => set({ sortFilter: sort }),

	applyFilters: (files) => {
		const { typeFilter, suspiciousFilter, search, sortFilter } = get()

		// 🔍 Фильтрация
		let result = files.filter((file) => {
			const matchesType = typeFilter === 'all' || file.type === typeFilter
			const hasSuspicious = file.suspiciousReasons.length > 0
			const matchesSuspicious =
				suspiciousFilter === 'all' ||
				(suspiciousFilter === 'hasSuspicious' && hasSuspicious) ||
				(suspiciousFilter === 'noSuspicious' && !hasSuspicious)
			const matchesSearch = file.name
				.toLowerCase()
				.includes(search.toLowerCase())

			return matchesType && matchesSuspicious && matchesSearch
		})

		// ↕️ Сортировка
		result = result.sort((a, b) => {
			switch (sortFilter) {
				case 'sizeAsc':
					return a.size - b.size
				case 'sizeDesc':
					return b.size - a.size
				case 'nameAsc':
					return a.name.localeCompare(b.name)
				case 'nameDesc':
					return b.name.localeCompare(a.name)
				default:
					return 0
			}
		})

		set({ filteredFiles: result })
	},
}))
