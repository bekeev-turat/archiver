import type { FileStats } from '../store/analyzer/file-analyzer.type'
import {
	SortFilterSelector,
	SuspiciousFilterSelector,
	TypeFilterSelector,
} from './filters'

interface FileFilterType {
	stats: FileStats
	loading: boolean
}

export const FileFilter = ({ stats, loading }: FileFilterType) => {
	return (
		<>
			<p className='w-full font-semibold mb-2 text-2xl'>Фильтры</p>
			<div className='flex gap-2'>
				<TypeFilterSelector stats={stats} loading={loading} />
				<SuspiciousFilterSelector stats={stats} />
				<SortFilterSelector />
			</div>
		</>
	)
}
