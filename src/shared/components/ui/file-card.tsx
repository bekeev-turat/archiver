import { FaDownload } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import type { FileData } from '../../store/zip/zip.types'
import { Button } from './button'

interface FileCardProps {
	file: FileData
	onDownload: (url: string, name: string) => void
}

export const FileCard: React.FC<FileCardProps> = ({ file, onDownload }) => {
	return (
		<div className='p-1 border rounded-lg shadow-sm flex flex-col justify-between gap-2 overflow-hidden animate-fadeUpSlow'>
			<div className='flex flex-col gap-2'>
				<p className='text-lx text-wrap w-full font-semibold'>
					Имя файла:{' '}
					<Link
						to={`/view/${file.id}`}
						className='text-primary hover:underline cursor-pointer'
						title={file.name}
					>
						{file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name}
					</Link>
				</p>

				<p>Размер: {(file.size / 1024).toFixed(2)} кб</p>
			</div>
			{file.type === 'image' && (
				<Link
					to={`/view/${file.id}`}
					className='text-primary hover:underline cursor-pointer'
					title={file.name}
				>
					<img src={file.url} alt={file.name} className='w-full rounded-lg' />
				</Link>
			)}
			{file.type === 'video' && (
				<video src={file.url} controls className='w-full rounded-lg' />
			)}
			<div className='flex gap-2'>
				<Button
					variant='default'
					onClick={() => onDownload(file.url, file.name)}
					className='py-0'
				>
					<FaDownload />
				</Button>
			</div>
		</div>
	)
}
