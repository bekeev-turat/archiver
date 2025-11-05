import { FaDownload } from 'react-icons/fa'
import type { FileData } from '../../store/zip/zip.types'
import { Button } from './button'

interface FileCardProps {
	file: FileData
	onDownload: (url: string, name: string) => void
}

export const FileCard: React.FC<FileCardProps> = ({ file, onDownload }) => {
	return (
		<div className='p-1 border rounded-lg shadow-sm flex flex-col justify-between gap-2 overflow-hidden'>
			<div className='flex flex-col gap-2'>
				<p className='text-lx text-wrap w-full font-semibold'>
					Имя файла:{' '}
					{file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name}
				</p>

				{file.suspiciousReasons?.length > 0 && (
					<p className='text-[#e53835]'>
						Опасность: {file.suspiciousReasons.join(', ')}
					</p>
				)}

				<p>Тип: {file.type}</p>
				<p>Размер: {(file.size / 1024).toFixed(2)} кб</p>
			</div>
			{file.type === 'image' && (
				<img src={file.url} alt={file.name} className='w-full rounded-lg' />
			)}
			{file.type === 'video' && (
				<video src={file.url} controls className='w-full rounded-lg' />
			)}
			<div className='flex gap-2'>
				{file.type !== 'other' && (
					<Button
						className='w-full p-0'
						variant='outline'
						link={`/view/${file.id}`}
					>
						Просмотр
					</Button>
				)}
				<Button
					variant='primary'
					onClick={() => onDownload(file.url, file.name)}
					className='py-0'
				>
					<FaDownload />
				</Button>
			</div>
		</div>
	)
}
