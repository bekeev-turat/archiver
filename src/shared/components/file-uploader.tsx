'use client'

import React from 'react'
import { useShallow } from 'zustand/shallow'
import { useZipPreview } from '../store/zip-store'

export const FileUploader: React.FC = () => {
	const [files, loading, getFiles, clearFiles] = useZipPreview(
		useShallow((state) => [
			state.files,
			state.loading,
			state.getFiles,
			state.clearFiles,
		]),
	)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) getFiles(file)
	}

	console.log(files.length, loading, getFiles, clearFiles)

	return (
		<div className='flex flex-col items-cexnter gap-4 p-6'>
			<label className='px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700'>
				Загрузить ZIP{' '}
				<input
					type='file'
					accept='.zip'
					className='hidden'
					onChange={handleChange}
				/>
			</label>
		</div>
	)
}
