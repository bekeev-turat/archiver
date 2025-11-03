import { useShallow } from 'zustand/shallow'
import { useFilters, type SuspiciousFilter } from '../../store/filters-store'
import type { FileStats } from '../../lab/file-analyzer'
import { InputSelect } from '../ui/input-select'

interface Props {
	stats: FileStats
}

export const SuspiciousFilterSelector = ({ stats }: Props) => {
	const { suspiciousFiles } = stats
	const [suspiciousFilter, setSuspiciousFilter] = useFilters(
		useShallow((state) => [state.suspiciousFilter, state.setSuspiciousFilter]),
	)

	if (suspiciousFiles.length === 0) return null

	const suspiciousOptions: Record<string, SuspiciousFilter> = {
		все: 'all',
		'только подозрительные файлы': 'hasSuspicious',
		'только не подазрительные файлы': 'noSuspicious',
	}

	return (
		<div className='w-96 flex gap-1 items-center'>
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
