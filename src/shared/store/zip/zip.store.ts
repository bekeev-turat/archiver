import { create } from 'zustand'
import { extractZip } from '../../lab/zip-extractor'
import type { FileData } from './zip.types'

interface ZipState {
	files: FileData[]
	loading: boolean
	loadZip: (file: File) => Promise<void>
	clearFiles: () => void
}

export const useZipStore = create<ZipState>((set) => ({
	files: [],
	loading: false,

	loadZip: async (file) => {
		set({ loading: true })
		try {
			const extractedFiles = await extractZip(file)
			set({ files: extractedFiles })
		} catch (e) {
			console.error('Ошибка при загрузке архива', e)
		} finally {
			set({ loading: false })
		}
	},

	clearFiles: () => set({ files: [] }),
}))
