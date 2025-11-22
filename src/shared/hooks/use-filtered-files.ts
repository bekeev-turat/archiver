import { useZipStore } from '../store/zip/zip.store'
import { useEffect, useMemo } from 'react'
import { useAnalyzerStore } from '../store/analyzer/file-analyzer.store'
import { useFiltersStore } from '../store/filters/filters.store'
import { sortStrategies } from '../lab/sort-strategies'

export const useFilteredFiles = () => {
	const { files, loading, clearFiles } = useZipStore()
	const { stats, analyze, resetStats } = useAnalyzerStore()
	const { type, suspicious, setSuspicious, sort, setSort, page, setPage } =
		useFiltersStore()

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

		if (Array.isArray(suspicious) && suspicious.length > 0) {
			result = result.filter((f) => {
				const has = f.suspiciousReasons?.length > 0
				// Если выбран фильтр "hasSuspicious", оставляем файлы с подозрениями
				// Если выбран фильтр "noSuspicious", оставляем файлы без подозрений
				// Если выбран оба, оставляем все
				return (
					(suspicious.includes('hasSuspicious') && has) ||
					(suspicious.includes('noSuspicious') && !has)
				)
			})
		}

		result.sort(sortStrategies[sort])
		setPage(1)

		return result
	}, [files, type, suspicious, sort])

	return {
		files: filteredFiles,
		stats,
		type,
		loading,
		clearFiles,
		page,
		setPage,
		suspicious,
		setSuspicious,
		sort,
		setSort,
	}
}
