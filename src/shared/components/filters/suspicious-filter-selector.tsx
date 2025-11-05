import type { SuspiciousFilter } from '../../store/filters/filters.types'
import {
	MenubarCheckboxItem,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
} from '../ui/menubar'
import type { FileData } from '@/shared/store/zip/zip.types'
import { suspiciousOptions } from '@/shared/constants/filters'

interface Props {
	suspiciousFiles: FileData[]
	suspiciousFilter: SuspiciousFilter[]
	setSuspiciousFilter: (
		value:
			| SuspiciousFilter[]
			| ((prev: SuspiciousFilter[]) => SuspiciousFilter[]),
	) => void
}

export const SuspiciousFilterSelector = ({
	suspiciousFiles,
	suspiciousFilter,
	setSuspiciousFilter,
}: Props) => {
	if (suspiciousFiles.length === 0) return null

	const handleSuspiciousChange = (key: SuspiciousFilter) => {
		setSuspiciousFilter((prev) =>
			prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
		)
	}

	return (
		<MenubarSub>
			<MenubarSubTrigger>Показывать</MenubarSubTrigger>
			<MenubarSubContent>
				{Object.entries(suspiciousOptions).map(([key, label]) => (
					<MenubarCheckboxItem
						key={key}
						checked={suspiciousFilter.includes(key as SuspiciousFilter)}
						onCheckedChange={() =>
							handleSuspiciousChange(key as SuspiciousFilter)
						}
					>
						{label}
					</MenubarCheckboxItem>
				))}
			</MenubarSubContent>
		</MenubarSub>
	)
}
