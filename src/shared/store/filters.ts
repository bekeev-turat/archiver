import { create } from 'zustand'
import type { FileType } from '../@types/file-data'

interface FilterStore {
	filters: FileType[]
	setFilters: (newFilters: FileType[]) => void
}

export const useFilters = create<FilterStore>((set) => ({
	filters: ['image', 'video', 'other'],
	setFilters: (newFilters) => {
		set({ filters: newFilters })
	},
}))
