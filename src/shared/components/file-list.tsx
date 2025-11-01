'use client'

import { useShallow } from 'zustand/shallow'
import { useZipPreview } from '../store/zip-store'
import type React from 'react'
import { Button } from './shared/button'
import type { FileData } from '../@types/file-data'

export const FileList: React.FC = () => {
	const [files, loading] = useZipPreview(
		useShallow((state) => [state.files, state.loading]),
	)

	const downloadFile = (url: string, name: string) => {
		const a = document.createElement('a')
		a.href = url
		a.download = name
		a.click()
	}
	console.log(files)

	return (
		<>
			{loading && <p>📦 Распаковка архива...</p>}
			{files.length > 0 && (
				<>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full'>
						{files.map((file: FileData, i: number) => (
							<div
								key={i}
								className='p-1 border rounded-lg shadow-sm flex flex-col justify-between gap-2 overflow-hidden'
							>
								<div className='flex flex-col gap-2'>
									<p className='text-lx text-wrap w-full font-semibold'>
										Имя файла:{' '}
										{file.name.length > 20
											? file.name.slice(0, 20) + '...'
											: file.name}
									</p>
									{file.suspiciousReasons.length > 0 && (
										<p className='text-[#e53835]'>
											Опасность: {file.suspiciousReasons.map((s) => s)}
										</p>
									)}
									<p>Тип: {file.type}</p>
								</div>

								{file.type !== 'other' &&
									(file.type === 'image' ? (
										<img
											src={file.url}
											alt={file.name}
											className='w-full rounded-lg'
										/>
									) : (
										<video
											src={file.url}
											controls
											className='w-full rounded-lg'
										/>
									))}

								<Button
									variant='primary'
									onClick={() => downloadFile(file.url, file.name)}
								>
									Скачать
								</Button>
							</div>
						))}
					</div>
				</>
			)}
		</>
	)
}
