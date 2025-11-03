export type FileType = 'image' | 'video' | 'other'

export interface FileData {
	name: string
	filePath: string
	url: string
	size: number
	type: FileType
	suspiciousReasons: string[]
}
