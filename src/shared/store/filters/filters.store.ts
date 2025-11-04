import { create } from 'zustand'
import type { SortFilter, SuspiciousFilter, TypeFilter } from './filters.types'

interface FiltersState {
	type: TypeFilter
	suspicious: SuspiciousFilter
	sort: SortFilter

	setType: (value: TypeFilter) => void
	setSuspicious: (value: SuspiciousFilter) => void
	setSort: (value: SortFilter) => void
	reset: () => void
}

export const useFiltersStore = create<FiltersState>((set) => ({
	type: 'all',
	suspicious: 'all',
	sort: 'nameAsc',

	setType: (value) => set({ type: value }),
	setSuspicious: (value) => set({ suspicious: value }),
	setSort: (value) => set({ sort: value }),

	reset: () => set({ type: 'all', suspicious: 'all', sort: 'nameAsc' }),
}))
