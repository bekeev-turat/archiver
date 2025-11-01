export type FileType = 'image' | 'video' | 'other'

export function detectFileType(fileName: string): FileType {
	if (fileName.match(/\.(png|jpe?g|gif|webp)$/i)) return 'image'
	if (fileName.match(/\.(mp4|webm|ogg)$/i)) return 'video'
	return 'other'
}
