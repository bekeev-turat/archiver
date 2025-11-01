export type FileType = 'image' | 'video' | 'other'

export interface FileData {
	name: string
	filePath: string
	url: string
	type: FileType
	suspiciousReasons: string[]
}
