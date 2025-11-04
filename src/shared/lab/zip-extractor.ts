import JSZip from 'jszip'
import { detectFileType } from './file-types'
import { checkSuspicious } from './suspicious-check'
import type { FileData } from '../store/zip/zip.types'

export async function extractZip(file: File): Promise<FileData[]> {
	const zip = await JSZip.loadAsync(file)
	const files: FileData[] = []
	const zipEntries = Object.keys(zip.files)

	for (let i = 0; i < zipEntries.length; i++) {
		const filePath = zipEntries[i]
		const zipFile = zip.files[filePath]
		if (zipFile.dir) continue

		const fileName = filePath.split('/').pop() || filePath
		const blob = await zipFile.async('blob')
		const url = URL.createObjectURL(blob)

		const type = detectFileType(fileName)
		const suspiciousReasons = await checkSuspicious(fileName, url)

		// Если это текстовый файл — извлекаем содержимое как текст
		let content: string | null = null
		if (type === 'text') {
			content = await zipFile.async('text')
		}

		files.push({
			id: i,
			name: fileName,
			filePath,
			size: blob.size,
			url,
			type,
			suspiciousReasons,
			blob,
			content,
		})
	}

	return files
}
