import type { FileStats } from '../../store/analyzer/file-analyzer.type'
import { Menubar, MenubarContent, MenubarTrigger } from '../ui/menubar'
import type {
	SortFilter,
	SuspiciousFilter,
} from '../../store/filters/filters.types'
import { TypeFilterSelector } from './type-filter-selector'
import { SuspiciousFilterSelector } from './suspicious-filter-selector'
import { SortFilterSelector } from './sort-filter-selector'
import { MenubarMenu } from '@radix-ui/react-menubar'

interface FileFilterType {
	stats: FileStats
	loading: boolean
	sort: SortFilter
	setSort: (value: SortFilter) => void
	suspicious: SuspiciousFilter[]
	setSuspicious: (
		value:
			| SuspiciousFilter[]
			| ((prev: SuspiciousFilter[]) => SuspiciousFilter[]),
	) => void
}

export function FileFilter({
	stats,
	loading,
	sort,
	setSort,
	suspicious,
	setSuspicious,
}: FileFilterType) {
	return (
		<div className='flex gap-2 flex-col md:flex-row'>
			<TypeFilterSelector stats={stats} loading={loading} />
			<Menubar className='w-fit'>
				<MenubarMenu>
					<MenubarTrigger>Фильтры</MenubarTrigger>
					<MenubarContent>
						<SuspiciousFilterSelector
							suspiciousFilter={suspicious}
							setSuspiciousFilter={setSuspicious}
							suspiciousFiles={stats.suspiciousFiles}
						/>
						<SortFilterSelector sort={sort} setSort={setSort} />
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	)
}
