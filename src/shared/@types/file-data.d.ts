export type FileType = 'image' | 'video' | 'other'

export interface FileData {
	name: string
	url: string
	type: FileType
	suspiciousReasons: string[]
}
