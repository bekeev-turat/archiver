import type { FileData } from '../@types/file-data'

export interface FileStats {
	hasImage: boolean
	hasVideo: boolean
	hasText: boolean
	hasOther: boolean
	suspiciousFiles: FileData[]
}

export function analyzeFiles(files: FileData[]): FileStats {
	const hasImage = files.some((f) => f.type === 'image')
	const hasVideo = files.some((f) => f.type === 'video')
	const hasText = files.some((f) => f.type === 'text')
	const hasOther = files.some((f) => f.type === 'other')
	const suspiciousFiles = files.filter(
		(f) => f.suspiciousReasons && f.suspiciousReasons.length > 0,
	)

	return { hasImage, hasVideo, hasText, hasOther, suspiciousFiles }
}
