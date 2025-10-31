'use client'

import { useShallow } from 'zustand/shallow'
import { useZipPreview, type FileData } from '../store/zip-store'
import type React from 'react'
import { Button } from './shared/button'

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

	return (
		<div>
			{loading && <p>📦 Распаковка архива...</p>}

			{files.length > 0 && (
				<>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-4xl'>
						{files.map((file: FileData, i: number) => (
							<div key={i} className='p-1 border rounded-lg shadow-sm'>
								{file.type === 'image' ? (
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
								)}
								<Button
									variant='primary'
									onClick={() => downloadFile(file.url, file.name)}
									// className='mt-2 w-full bg-[#2e7d31] text-white rounded-lg py-1 hover:bg-green-700 transition'
								>
									Скачать
								</Button>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	)
}
