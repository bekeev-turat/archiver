import type { FileStats } from "../store/analyzer/file-analyzer.type"
import type { FileData } from "../store/zip/zip.types"

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
