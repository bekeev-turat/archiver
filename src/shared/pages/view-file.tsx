import { FileViewer } from '../components/file-viewer'
import { Button } from '../components/ui/button'
import { getFileType, isSuspiciousFile } from '../hooks/file-types'
import { useFile } from '../hooks/use-file'
import { Space } from '../components/ui/space'
import type { FileData } from '../store/zip/zip.types'

export default function ViewFile() {
	const file = useFile()

	if (!file) {
		return <ViewFileNotFound />
	}

	const fileType = getFileType(file.name)
	const suspicious =
		isSuspiciousFile(file.name) || file.suspiciousReasons?.length > 0

	return (
		<div className='p-6 max-w-[1400px] mx-auto animate-fadeIn'>
			<ViewFileTop file={file} />

			{suspicious && (
				<ViewFileSuspicious suspiciousReasons={file.suspiciousReasons} />
			)}

			<div className='mt-6 w-full min-h-[200px]'>
				<FileViewer file={file} type={fileType} />
			</div>
		</div>
	)
}

export const ViewFileSuspicious = ({
	suspiciousReasons,
}: {
	suspiciousReasons: string[]
}) => {
	return (
		<>
			<div className='flex gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg text-red-800 dark:text-red-200 animate-fadeIn'>
				<span className='text-xl shrink-0'>⚠</span>
				<div className='flex-1 flex flex-col gap-1'>
					<strong className='font-semibold'>Внимание!</strong> Этот файл может
					быть потенциально опасен.
					{suspiciousReasons && suspiciousReasons.length > 0 && (
						<div className='text-[13px] opacity-90 mt-1'>
							Причины: {suspiciousReasons.join(', ')}
						</div>
					)}
				</div>
			</div>
			<Space h={16} />
		</>
	)
}

export const ViewFileTop = ({ file }: { file: FileData }) => {
	return (
		<div className='mb-6'>
			<Button link='/archiver' variant='outline'>
				← Назад к списку
			</Button>
			<Space h={16} />
			<div className='flex flex-col gap-3'>
				<h1
					className='text-2xl font-semibold text-foreground m-0 break-all leading-snug'
					title={file.name}
				>
					{file.name}
				</h1>
				<div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
					<span className='flex gap-1 items-center'>
						<strong className='font-semibold text-foreground'>Тип:</strong>{' '}
						{file.type}
					</span>
					<span className='flex gap-1 items-center'>
						<strong className='font-semibold text-foreground'>Размер:</strong>{' '}
						{(file.size / 1024).toFixed(2)} кб
					</span>
				</div>
			</div>
		</div>
	)
}

const ViewFileNotFound = () => (
	<div className='p-6 max-w-[1400px] mx-auto animate-fadeIn'>
		<div className='flex flex-col items-center justify-center min-h-[400px] gap-4 text-center'>
			<h2 className='text-2xl font-semibold text-foreground m-0'>
				Файл не найден
			</h2>
			<p className='text-base text-muted-foreground m-0'>
				Запрошенный файл не существует или с ним что-то не так.
			</p>
			<Button link='/archiver' variant='outline'>
				Назад к списку
			</Button>
		</div>
	</div>
)
