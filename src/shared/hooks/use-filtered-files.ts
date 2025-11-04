import { useZipStore } from '../store/zip/zip.store'
import { useEffect, useMemo } from 'react'
import { useAnalyzerStore } from '../store/analyzer/file-analyzer.store'
import { useFiltersStore } from '../store/filters/filters.store'
import { sortStrategies } from '../lab/sort-strategies'

export const useFilteredFiles = () => {
	const { files, loading, clearFiles } = useZipStore()
	const { stats, analyze, resetStats } = useAnalyzerStore()
	const { type, suspicious, sort } = useFiltersStore()

	// анализируем при изменении списка файлов
	useEffect(() => {
		if (files.length > 0) {
			console.log('5')

			// если analyze синхронный — ок, если асинхронный — можно await/then
			analyze(files)
		} else {
			console.log('d')

			resetStats()
		}
	}, [files])

	// фильтрация и сортировка
	const filteredFiles = useMemo(() => {
		let result = files

		// фильтр по типу
		if (type !== 'all') {
			result = result.filter((f) => f.type === type)
		}

		// фильтр по suspicious
		if (suspicious === 'hasSuspicious') {
			result = result.filter((f) => f.suspiciousReasons?.length)
		} else if (suspicious === 'noSuspicious') {
			result = result.filter((f) => !f.suspiciousReasons?.length)
		}

		result.sort(sortStrategies[sort])

		return result
	}, [files, type, suspicious, sort])

	return {
		files: filteredFiles,
		stats,
		loading,
		clearFiles,
	}
}
