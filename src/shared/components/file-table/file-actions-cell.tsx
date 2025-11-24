import { FaDownload } from 'react-icons/fa'
import { Button } from '../ui/button'

interface FileActionsCellProps {
	url: string
	name: string
	onDownload: (url: string, name: string) => void
}

export const FileActionsCell: React.FC<FileActionsCellProps> = ({
	url,
	name,
	onDownload,
}) => {
	return (
		<div className='flex gap-2'>
			<Button
				variant='default'
				onClick={() => onDownload(url, name)}
				className='py-0'
			>
				<FaDownload />
			</Button>
		</div>
	)
}
