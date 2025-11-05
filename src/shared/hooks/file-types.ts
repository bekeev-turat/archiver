import { suspiciousExtensions } from '../lab/suspicious-check'
import type { FileType } from '../store/zip/zip.types'

const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp']
const videoExtensions = ['.mp4', '.webm', '.ogg']
const textExtensions = [
	'.txt',
	'.md',
	'.json',
	'.xml',
	'.html',
	'.css',
	'.scss',
	'.js',
	'.jsx',
	'.ts',
	'.tsx',
	'.java',
	'.py',
	'.c',
	'.cpp',
]

export const getFileExtension = (fileName?: string): string => {
	if (!fileName) return ''
	return '.' + fileName.split('.').pop()?.toLowerCase()
}

export const getFileType = (fileName?: string): FileType => {
	const ext = getFileExtension(fileName)
	if (imageExtensions.includes(ext)) return 'image'
	if (videoExtensions.includes(ext)) return 'video'
	if (textExtensions.includes(ext)) return 'text'
	return 'other'
}

export const isSuspiciousFile = (fileName?: string): boolean => {
	const ext = getFileExtension(fileName)
	return suspiciousExtensions.includes(ext)
}
