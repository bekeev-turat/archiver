import { useState } from 'react'
import type { FileData } from '../@types/file-data'
import { BiError } from 'react-icons/bi'
import { CiCircleCheck } from 'react-icons/ci'

export const SuspiciousFilesAlert = ({
	suspicious,
	limit = 5,
}: {
	suspicious: FileData[]
	limit?: number
}) => {
	const [showAll, setShowAll] = useState(false)

	const list = showAll ? suspicious : suspicious.slice(0, limit)
	return (
		<>
			{suspicious.length > 0 ? (
				<div className='bg-red-100 p-3 rounded-lg mt-2'>
					<p className='font-semibold text-red-700 flex items-center gap-1'>
						<BiError /> Найдены подозрительные файлы:
					</p>
					<ul className='list-disc list-inside text-red-600'>
						{list.map((f, i) => (
							<li key={i}>
								<b>{f.name}</b> — {f.suspiciousReasons?.join(', ')}
							</li>
						))}
					</ul>
					{suspicious.length > limit && (
						<div className={showAll ? 'border-t border-t-neutral-100' : ''}>
							<button onClick={() => setShowAll(!showAll)}>
								<b>{showAll ? 'Скрыть' : '+ Показать все'}</b>
							</button>
						</div>
					)}
				</div>
			) : (
				<p className='bg-green-100 p-5 rounded-lg text-green-600 font-medium mt-2 flex items-center gap-1'>
					<CiCircleCheck /> Подозрительных файлов не найдено
				</p>
			)}
		</>
	)
}
