export type FileType = 'image' | 'video' | 'text' | 'other'

export interface FileData {
	id: number
	name: string
	filePath: string
	url: string
	size: number
	type: FileType
	suspiciousReasons: string[]
	blob?: Blob
	content?: string | null
}
