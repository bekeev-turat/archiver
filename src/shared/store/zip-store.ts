import JSZip from 'jszip'
import { create } from 'zustand'

export interface FileData {
	name: string
	url: string
	type: 'image' | 'video'
}

interface ZipStore {
	files: FileData[] // <- changed
	loading: boolean
	getFiles: (file: File) => Promise<void> // <- указали параметр
	clearFiles: () => void
}

export const useZipPreview = create<ZipStore>((set) => ({
	files: [],
	loading: false,
	getFiles: async (file: File) => {
		set({ loading: true })
		try {
			const zip = await JSZip.loadAsync(file)
			const extractedFiles: FileData[] = []

			for (const fileName of Object.keys(zip.files)) {
				const zipFile = zip.files[fileName]
				if (!zipFile.dir) {
					const blob = await zipFile.async('blob')
					const url = URL.createObjectURL(blob)

					if (fileName.match(/\.(png|jpe?g|gif|webp)$/i)) {
						extractedFiles.push({ name: fileName, url, type: 'image' })
					} else if (fileName.match(/\.(mp4|webm|ogg)$/i)) {
						extractedFiles.push({ name: fileName, url, type: 'video' })
					} else {
						// при желании — пропускать или добавлять другие типы
					}
				}
			}

			set({ files: extractedFiles })
		} catch (error) {
			console.error('Ошибка при чтении архива:', error)
		} finally {
			set({ loading: false })
		}
	},
	clearFiles: () => {
		// ревокнуть URL-ы, если нужно
		set((state) => {
			state.files.forEach((f) => URL.revokeObjectURL(f.url))
			return { files: [] }
		})
	},
}))
