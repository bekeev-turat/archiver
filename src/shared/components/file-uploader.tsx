import { Button } from './ui/button'
import { AnimationLottie } from './ui/animation-lottie'
import mainGraphic from '../../../public/main_graphic.json'
import { ScrollIndicator } from './ui/scroll-Indicator'
import { useFileUpload } from '../hooks/use-file-upload'

export const FileUploader: React.FC = () => {
	const { inputRef, handleButtonClick, handleChange, files } = useFileUpload()

	return (
		<div className='h-screen flex justify-center lg:justify-between gap-0 md:gap-15 items-center lg:mb-0 relative'>
			<div className='flex flex-col items-center gap-5 w-[70%]'>
				<h1 className='text-2xl lg:text-3xl font-bold text-center'>
					Легкий просмотр ZIP-файлов
				</h1>

				<p className='text-lg mb-8 text-muted-foreground text-center'>
					Привет! Я <span className='font-semibold'>Бекеев Турат</span>, и я
					создаю удобные веб-инструменты. С этим сервисом вы можете мгновенно
					открывать ZIP-архивы прямо в браузере.
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

			{files.length > 0 && <ScrollIndicator className='left-1/2' />}
		</div>
	)
}
