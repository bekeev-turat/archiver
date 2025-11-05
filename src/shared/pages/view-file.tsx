import { FileViewer } from '../components/file-viewer'
import { Button } from '../components/ui/button'
import { getFileType, isSuspiciousFile } from '../hooks/file-types'
import { useFile } from '../hooks/use-file'

export default function ViewFile() {
	const file = useFile()

	if (!file) {
		return <div>Файл не найден</div>
	}

	const fileType = getFileType(file.name)
	const suspicious = isSuspiciousFile(file.name)

	return (
		<div style={{ padding: 16 }}>
			<Button link='/archiver'>Назад</Button>
			<h2>Файл: {file.name}</h2>
			{suspicious && (
				<div style={{ color: 'red', marginBottom: 8 }}>
					⚠ Этот файл может быть потенциально опасен.
				</div>
			)}
			<FileViewer file={file} type={fileType} />
		</div>
	)
}
