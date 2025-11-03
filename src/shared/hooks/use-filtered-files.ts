import { useShallow } from 'zustand/shallow'
import { useZipPreview } from '../store/zip-store'
import { useFilters } from '../store/filters-store'
import type { FileData } from '../@types/file-data'
import { useEffect, useMemo } from 'react'

export const useFilteredFiles = (): {
	files: FileData[]
	loading: boolean
	clearFiles: () => void
	setFilters: () => void
} => {
	const [files, loading, clearFiles] = useZipPreview(
		useShallow((state) => [state.files, state.loading, state.clearFiles]),
	)
	const [filteredFiles, applyFilters] = useFilters(
		useShallow((state) => [state.filteredFiles, state.applyFilters]),
	)

	const setFilters = useMemo(() => {
		return () => applyFilters(files)
	}, [files, applyFilters])

	useEffect(() => {
		setFilters()
	}, [files])

	return { files: filteredFiles, clearFiles, loading, setFilters }
}
