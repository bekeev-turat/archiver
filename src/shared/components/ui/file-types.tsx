import { FaImage, FaVideo, FaFileAlt, FaTimes } from 'react-icons/fa'
import { IoText } from 'react-icons/io5'

export function FileTypes({
	hasImage,
	hasVideo,
	hasText,
	hasOther,
	filesLength,
}: {
	hasImage: boolean
	hasVideo: boolean
	hasText: boolean
	hasOther: boolean
	filesLength: number
}) {
	return (
		<ul>
			<li className='flex gap-2 items-center'>
				Типы файлов:
				{hasImage && (
					<span className='flex items-center gap-1'>
						<FaImage /> изображения
					</span>
				)}
				{hasVideo && (
					<span className='flex items-center gap-1'>
						<FaVideo /> видео
					</span>
				)}
				{hasText && (
					<span className='flex items-center gap-1'>
						<IoText /> текст
					</span>
				)}
				{hasOther && (
					<span className='flex items-center gap-1'>
						<FaFileAlt /> другие
					</span>
				)}
				{!hasImage && !hasVideo && !hasOther && (
					<span className='flex items-center gap-1'>
						<FaTimes /> нет медиа
					</span>
				)}
			</li>
			<li className='w-full flex items-center gap-1'>
				Количество файлов: {filesLength}
			</li>
		</ul>
	)
}
