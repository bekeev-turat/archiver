import JSZip from 'jszip'
import { detectFileType } from './file-types'
import { checkSuspicious } from './suspicious-check'
import type { FileData } from '../@types/file-data'

export async function extractZip(file: File): Promise<FileData[]> {
	const zip = await JSZip.loadAsync(file)
	const files: FileData[] = []

	for (const filePath of Object.keys(zip.files)) {
		const zipFile = zip.files[filePath]
		if (zipFile.dir) continue

		// Получаем имя файла без пути (последняя часть после "/")
		const fileName = filePath.split('/').pop() || filePath
		const blob = await zipFile.async('blob')
		const url = URL.createObjectURL(blob)

		const type = detectFileType(fileName)
		const suspiciousReasons = await checkSuspicious(fileName, url)

		files.push({
			name: fileName,
			filePath,
			url,
			type,
			suspiciousReasons,
		})
	}

	return files
}