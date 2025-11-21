import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useZipStore } from '../store/zip/zip.store'
import { useFiltersStore } from '../store/filters/filters.store'
import { useShallow } from 'zustand/shallow'
import { AnimationLottie } from './ui/animation-lottie'
import mainGraphic from '../../../public/main_graphic.json'

export const FileUploader: React.FC = () => {
	const navigate = useNavigate()
	const [files, loadZip] = useZipStore(
		useShallow((state) => [state.files, state.loadZip]),
	)
	const reset = useFiltersStore(useShallow((state) => state.reset))

	const inputRef = useRef<HTMLInputElement>(null)

	const handleButtonClick = () => {
		inputRef.current?.click() // Кликаем по инпуту
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			loadZip(file)
			reset()
			navigate('archiver', { replace: true })
		}
	}

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.value = ''
		}
	}, [files])

	return (
		<div className='flex justify-center lg:justify-between gap-0 md:gap-15 items-center my-20 lg:mb-0'>
			<div className='flex flex-col items-center gap-5 w-[70%]'>
				<h1 className='text-2xl lg:text-3xl font-bold text-center'>
					Легкий просмотр ZIP-файлов
				</h1>

				<p className='text-lg mb-8 text-muted-foreground text-center'>
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
			<AnimationLottie
				animationPath={mainGraphic}
				className='hidden lg:block'
				width={'60%'}
			/>

			{/* <SplinesIcon className='w-full' /> */}
		</div>
	)
}
