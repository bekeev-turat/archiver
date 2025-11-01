export interface FileData {
	name: string
	url: string
	type: 'image' | 'video' | 'other'
	suspiciousReasons: string[]
}
