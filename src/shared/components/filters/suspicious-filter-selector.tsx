import { useShallow } from 'zustand/shallow'
import type { FileStats } from '../../lab/file-analyzer'
import { useFiltersStore } from '../../store/filters/filters.store'
import type { SuspiciousFilter } from '../../store/filters/filters.types'
import { InputSelect } from '../ui/input-select'

interface Props {
	stats: FileStats
}

export const SuspiciousFilterSelector = ({ stats }: Props) => {
	const { suspiciousFiles } = stats
	const [suspiciousFilter, setSuspiciousFilter] = useFiltersStore(
		useShallow((state) => [state.suspicious, state.setSuspicious]),
	)

	if (suspiciousFiles.length === 0) return null

	const suspiciousOptions: Record<string, SuspiciousFilter> = {
		все: 'all',
		'только подозрительные файлы': 'hasSuspicious',
		'только не подазрительные файлы': 'noSuspicious',
	}

	return (
		<div className='w-full flex gap-1 items-center'>
			Показывать{' '}
			<InputSelect
				variant='text'
				options={Object.keys(suspiciousOptions)}
				onChange={(value) => setSuspiciousFilter(suspiciousOptions[value])}
				defaultValue={Object.keys(suspiciousOptions).find(
					(key) => suspiciousOptions[key] === suspiciousFilter,
				)}
			/>
		</div>
	)
}
