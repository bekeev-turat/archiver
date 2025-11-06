import type { FileType } from "../store/zip/zip.types"

export function detectFileType(fileName: string): FileType {
	// картинки
	if (/\.(png|jpe?g|gif|webp)$/i.test(fileName)) return 'image'

	// видео
	if (/\.(mp4|webm|ogg)$/i.test(fileName)) return 'video'

	// текстовые файлы
	if (
		/\.(txt|md|json|js|ts|tsx|jsx|html|css|xml|yml|yaml|py|c|cpp|java)$/i.test(
			fileName,
		)
	)
		return 'text'

	// всё остальное
	return 'other'
}
