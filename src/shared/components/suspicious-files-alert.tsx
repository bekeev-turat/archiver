import { useState } from 'react'
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from '@/shared/components/ui/alert'

import type { FileData } from '../store/zip/zip.types'
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react'

export function SuspiciousFilesAlert({
	suspicious,
	limit = 5,
}: {
	suspicious: FileData[]
	limit?: number
}) {
	const [showAll, setShowAll] = useState(false)

	const list = showAll ? suspicious : suspicious.slice(0, limit)

	return (
		<>
			{suspicious.length > 0 ? (
				<Alert variant='destructive' className='animate-fadeIn'>
					{/* <FaExclamationTriangle className='h-4 w-4' /> */}
					<AlertCircleIcon />
					<AlertTitle>Найдены подозрительные файлы</AlertTitle>

					<AlertDescription>
						<ul className='list-disc list-inside space-y-1 mt-2'>
							{list.map((f, i) => (
								<li key={i} className='animate-fadeIn'>
									<b>{f.name}</b> — {f.suspiciousReasons?.join(', ')}
								</li>
							))}
						</ul>

						{suspicious.length > limit && (
							<button
								key={showAll ? 'hide' : 'show'}
								onClick={() => setShowAll(!showAll)}
								className='mt-2 text-red-700 underline animate-fadeUp'
							>
								{showAll ? 'Скрыть' : 'Показать все'}
							</button>
						)}
					</AlertDescription>
				</Alert>
			) : (
				<Alert className='border-green-400 bg-green-50 text-green-700 animate-fadeIn'>
					<CheckCircle2Icon />
					<AlertTitle>Подозрительных файлов нет</AlertTitle>
					<AlertDescription>
						Все загруженные файлы выглядят безопасно.
					</AlertDescription>
				</Alert>
			)}
		</>
	)
}
