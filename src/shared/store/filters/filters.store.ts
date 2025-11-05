import { create } from 'zustand'
import type { SortFilter, SuspiciousFilter, TypeFilter } from './filters.types'

interface FiltersState {
	type: TypeFilter
	suspicious: SuspiciousFilter
	sort: SortFilter
	page: number

	setType: (value: TypeFilter) => void
	setSuspicious: (value: SuspiciousFilter) => void
	setSort: (value: SortFilter) => void
	setPage: (value: number) => void
	reset: () => void
}

export const useFiltersStore = create<FiltersState>((set) => ({
	type: 'all',
	suspicious: 'all',
	sort: 'nameAsc',
	page: 1,

	setType: (value) => set({ type: value }),
	setSuspicious: (value) => set({ suspicious: value }),
	setSort: (value) => set({ sort: value }),
	setPage: (value) => set({ page: value }),

	reset: () => set({ type: 'all', suspicious: 'all', sort: 'nameAsc', page: 1 }),
}))
