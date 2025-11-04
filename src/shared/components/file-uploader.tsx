'use client'

import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { SplinesIcon } from '../assets/icon/splines'
import { useZipStore } from '../store/zip/zip.store'

export const FileUploader: React.FC = () => {
	const navigate = useNavigate()
	const { files, loadZip } = useZipStore()

	const inputRef = useRef<HTMLInputElement>(null)

	const handleButtonClick = () => {
		inputRef.current?.click() // Кликаем по инпуту
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) loadZip(file)
		navigate('archiver', { replace: true })
	}

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.value = ''
		}
	}, [files])

	return (
		<div className='flex flex-col lg:flex-row justify-between items-center '>
			<div className='flex flex-col items-center gap-5 lg:w-11/12'>
				<h1 className='text-3xl font-bold text-center'>
					Легкий просмотр ZIP-файлов
				</h1>

				<p className='text-xl text-center'>
					Привет! Я <span className='font-semibold'>Бекеев Турат</span>, и я
					создаю удобные веб-инструменты. С этим сервисом вы можете мгновенно
					открывать ZIP-архивы прямо в браузере, просматривать файлы и скачивать
					только нужное. Всё просто и быстро, без лишних установок.
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

			<SplinesIcon className='w-full' />
		</div>
	)
}
