import { create } from 'zustand'
import type { FileData } from '../@types/file-data'
import { extractZip } from '../lab/zip-extractor'

interface ZipStore {
	files: FileData[]
	loading: boolean
	getFiles: (file: File) => Promise<void>
	clearFiles: () => void
}

export const useZipPreview = create<ZipStore>((set) => ({
	files: [],
	loading: false,
	getFiles: async (file: File) => {
		set({ loading: true })
		try {
			const extractedFiles = await extractZip(file)
			set({ files: extractedFiles })
		} catch (error) {
			console.error('Ошибка при чтении архива:', error)
		} finally {
			set({ loading: false })
		}
	},
	clearFiles: () => {
		set((state) => {
			state.files.forEach((f) => URL.revokeObjectURL(f.url))
			return { files: [] }
		})
	},
}))
