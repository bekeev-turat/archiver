import { create } from 'zustand'
import type { FileData } from '../@types/file-data'
import { extractZip } from '../lab/zip-extractor'
import { analyzeFiles, type FileStats } from '../lab/file-analyzer'

interface ZipStore {
	files: FileData[]
	stats: FileStats
	loading: boolean
	getFiles: (file: File) => Promise<void>
	clearFiles: () => void
}

const BASE_STATS = {
	hasImage: false,
	hasVideo: false,
	hasText: false,
	hasOther: false,
	suspiciousFiles: [],
}

export const useZipPreview = create<ZipStore>((set) => ({
	files: [],
	stats: BASE_STATS,
	loading: false,

	getFiles: async (file: File) => {
		set({ loading: true })
		try {
			const extractedFiles = await extractZip(file)
			const stats = analyzeFiles(extractedFiles)
			set({ files: extractedFiles, stats })
		} catch (error) {
			console.error('Ошибка при чтении архива:', error)
		} finally {
			set({ loading: false })
		}
	},

	clearFiles: () => {
		set((state) => {
			state.files.forEach((f) => URL.revokeObjectURL(f.url))
			return { files: [], stats: BASE_STATS }
		})
	},
}))
