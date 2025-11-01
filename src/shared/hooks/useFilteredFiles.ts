import { useShallow } from 'zustand/shallow'
import { useZipPreview } from '../store/zip-store'
import { useFilters } from '../store/filters'
import type { FileData } from '../@types/file-data'

export const useFilteredFiles = (): { files: FileData[]; loading: boolean } => {
	const [files, loading] = useZipPreview(
		useShallow((state) => [state.files, state.loading]),
	)
	const [filters] = useFilters(useShallow((state) => [state.filters]))

	const filteredFiles = files.filter((file) => filters.includes(file.type))

	return { files: filteredFiles, loading }
}
