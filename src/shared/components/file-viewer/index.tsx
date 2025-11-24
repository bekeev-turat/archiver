import React from 'react'
import type { FileData, FileType } from '../../store/zip/zip.types'
import { getFileExtension } from '../../hooks/file-types'
import { ImageViewer } from './image-viewer'
import { VideoViewer } from './video-viewer'
import { TextViewer } from './text-viewer'
import { BinaryOtherViewer } from './binary-other-viewer'
import { OtherViewer } from './other-viewer'

// Выделяем бинарные расширения в отдельную функцию для SRP
const binaryExtensions = [
	'.png',
	'.jpg',
	'.jpeg',
	'.gif',
	'.svg',
	'.webp',
	'.pdf',
	'.zip',
	'.exe',
	'.dll',
	'.bin',
]
function isBinaryFile(ext: string) {
	return binaryExtensions.includes(ext.toLowerCase())
}

interface FileViewerProps {
	file: FileData
	type: FileType
}

export const FileViewer: React.FC<FileViewerProps> = ({ file, type }) => {
	const ext = getFileExtension(file.name)
	if (type === 'image') {
		return <ImageViewer file={file} />
	}
	if (type === 'video') {
		return <VideoViewer file={file} />
	}
	if (type === 'text') {
		return <TextViewer file={file} />
	}
	if (type === 'other') {
		if (isBinaryFile(ext)) {
			return <BinaryOtherViewer />
		}
		return <OtherViewer />
	}
	return null
}
