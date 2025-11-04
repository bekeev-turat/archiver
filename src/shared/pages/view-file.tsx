import { useParams } from 'react-router-dom'
import { useZipPreview } from '../store/zip-store'
import { useShallow } from 'zustand/shallow'
import { useMemo } from 'react'
import { suspiciousExtensions } from '../lab/suspicious-check'

const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp']
const videoExtensions = ['.mp4', '.webm', '.ogg']
const textExtensions = [
	'.txt',
	'.md',
	'.json',
	'.xml',
	'.html',
	'.css',
	'.js',
	'.jsx',
	'.ts',
	'.tsx',
	'.java',
	'.py',
	'.c',
	'.cpp',
]

export default function ViewFile() {
	const { id } = useParams<{ id: string }>()
	const files = useZipPreview(useShallow((state) => state.files))

	const file = files.find((file) => file.id === Number(id))

	const ext = useMemo(() => {
		if (!file?.name) return ''
		return '.' + file.name.split('.').pop()?.toLowerCase()
	}, [file])

	const isSuspicious = suspiciousExtensions.includes(ext)
	const isImage = imageExtensions.includes(ext)
	const isVideo = videoExtensions.includes(ext)
	const isText = textExtensions.includes(ext)

	if (!file) {
		return <div>Файл не найден</div>
	}

	return (
		<div style={{ padding: 16 }}>
			<h2>Файл: {file.name}</h2>
			{isSuspicious && (
				<div style={{ color: 'red', marginBottom: 8 }}>
					⚠ Этот файл может быть потенциально опасен.
				</div>
			)}
			{file.blob && (
				<>
					{isImage && (
						<img
							src={URL.createObjectURL(file.blob)}
							alt={file.name}
							style={{ maxWidth: '100%', borderRadius: 8 }}
						/>
					)}

					{isVideo && (
						<video
							controls
							src={URL.createObjectURL(file.blob)}
							style={{ maxWidth: '100%', borderRadius: 8 }}
						/>
					)}
				</>
			)}

			{isText && (
				<pre
					style={{
						background: '#f5f5f5',
						padding: 12,
						borderRadius: 8,
						overflowX: 'auto',
					}}
				>
					{file.content}
				</pre>
			)}

			{!isImage && !isVideo && !isText && (
				<div>Этот тип файла нельзя просмотреть напрямую.</div>
			)}
		</div>
	)
}
