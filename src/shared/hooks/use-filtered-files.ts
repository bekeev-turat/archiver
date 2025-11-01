import { useShallow } from 'zustand/shallow'
import { useZipPreview } from '../store/zip-store'
import { useFilters } from '../store/filters'
import type { FileData } from '../@types/file-data'

export const useFilteredFiles = (): {
	files: FileData[]
	loading: boolean
	clearFiles: () => void
} => {
	const [files, loading, clearFiles] = useZipPreview(
		useShallow((state) => [state.files, state.loading, state.clearFiles]),
	)
	const [filters] = useFilters(useShallow((state) => [state.filters]))

	const filteredFiles = files.filter((file) => filters.includes(file.type))

	return { files: filteredFiles, clearFiles, loading }
}
