import { useZipStore } from '../store/zip/zip.store'
import { useEffect, useMemo } from 'react'
import { useAnalyzerStore } from '../store/analyzer/file-analyzer.store'
import { useFiltersStore } from '../store/filters/filters.store'
import { sortStrategies } from '../lab/sort-strategies'

export const useFilteredFiles = () => {
	const { files, loading, clearFiles } = useZipStore()
	const { stats, analyze, resetStats } = useAnalyzerStore()
	const { type, suspicious, sort, page, setPage } = useFiltersStore()

	useEffect(() => {
		if (files.length > 0) {
			analyze(files)
		} else {
			resetStats()
		}
	}, [files])

	const filteredFiles = useMemo(() => {
		let result = files

		if (type !== 'all') {
			result = result.filter((f) => f.type === type)
		}

		if (suspicious === 'hasSuspicious') {
			result = result.filter((f) => f.suspiciousReasons?.length)
		} else if (suspicious === 'noSuspicious') {
			result = result.filter((f) => !f.suspiciousReasons?.length)
		}

		result.sort(sortStrategies[sort])
		setPage(1)

		return result
	}, [files, type, suspicious, sort])

	return {
		files: filteredFiles,
		stats,
		loading,
		clearFiles,
		page,
		setPage,
	}
}
