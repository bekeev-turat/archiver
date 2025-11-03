import type { FileStats } from '../lab/file-analyzer'
import {
	SortFilterSelector,
	SuspiciousFilterSelector,
	TypeFilterSelector,
} from './filters'
import { Button } from './ui/button'

interface FileFilterType {
	stats: FileStats
	loading: boolean
	setFilters: () => void
}

export const FileFilter = ({ stats, loading, setFilters }: FileFilterType) => {
	return (
		<div className='flex gap-2 flex-wrap'>
			<p className='w-full font-semibold mb-2 text-2xl'>Фильтры</p>
			<TypeFilterSelector stats={stats} loading={loading} />
			<SuspiciousFilterSelector stats={stats} />
			<SortFilterSelector />
			<Button variant='primary' onClick={() => setFilters()}>
				Применить фильтры
			</Button>
		</div>
	)
}
