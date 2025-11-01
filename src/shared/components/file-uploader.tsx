'use client'

import React, { useRef } from 'react'
import { useShallow } from 'zustand/shallow'
import { useZipPreview } from '../store/zip-store'
import { Button } from './shared/button'
// todo исправить баг

export const FileUploader: React.FC = () => {
	const [getFiles] = useZipPreview(useShallow((state) => [state.getFiles]))

	const inputRef = useRef<HTMLInputElement>(null)

	const handleButtonClick = () => {
		inputRef.current?.click() // Кликаем по инпуту
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) getFiles(file)
	}

	return (
		<div className='flex flex-col items-center gap-4 p-6'>
			<Button onClick={handleButtonClick}>Загрузить ZIP</Button>
			<input
				ref={inputRef}
				type='file'
				accept='.zip'
				className='hidden'
				onChange={handleChange}
			/>
		</div>
	)
}
