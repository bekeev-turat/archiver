import React from 'react'
import type { FileData, FileType } from '../store/zip/zip.types'

interface FileViewerProps {
	file: FileData
	type: FileType
}

export const FileViewer: React.FC<FileViewerProps> = ({ file, type }) => {
	switch (type) {
		case 'image':
			return file.blob ? (
				<div className='w-full h-full'>
					<img
						className='w-full h-full'
						src={URL.createObjectURL(file.blob)}
						alt={file.name}
						style={{ maxWidth: '100%', borderRadius: 8 }}
					/>
				</div>
			) : null
		case 'video':
			return file.blob ? (
				<video
					controls
					src={URL.createObjectURL(file.blob)}
					style={{ maxWidth: '100%', borderRadius: 8 }}
				/>
			) : null
		case 'text':
			return (
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
			)
		case 'other':
			return <div>Этот тип файла нельзя просмотреть напрямую.</div>
		default:
			return null
	}
}
