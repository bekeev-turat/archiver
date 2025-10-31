declare module 'unrar.js' {
	export function createExtractorFromFile(options: { file: File }): Promise<any>
}
