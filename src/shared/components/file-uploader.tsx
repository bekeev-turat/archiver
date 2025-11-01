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
		<div className='flex justify-between items-center'>
			<div className='flex flex-col items-center gap-5 p-6'>
				<h1 className='text-4xl font-bold text-center'>
					Легкий просмотр ZIP-файлов
				</h1>

				<p className='text-2xl'>
					Привет! Я Бекеев Турат, и я создаю удобные веб-инструменты. С этим
					сервисом вы можете мгновенно открывать ZIP-архивы прямо в браузере,
					просматривать файлы и скачивать только нужное. Всё просто и быстро,
					без лишних установок.
				</p>
				<Button className='w-3xs' onClick={handleButtonClick}>
					Загрузить ZIP
				</Button>
				<input
					ref={inputRef}
					type='file'
					accept='.zip'
					className='hidden'
					onChange={handleChange}
				/>
			</div>

			<img src='/splines.svg' alt='splines' />
		</div>
	)
}
