// import { useState } from 'react'
// import JSZip from 'jszip'
// // import { createExtractorFromFile } from 'unrar.js'
// import { create } from 'zustand'

// interface FileData {
// 	name: string
// 	url: string
// 	type: 'image' | 'video'
// }

// export const useArchivePreview = create(set => ({
// 	files: [],
// 	loading: false,

// 	getRarFiles:  async (file: File) => {
// 		set({loading: true})
// 		try {
// 			if (file.name.endsWith('.zip')) {
// 				await handleZip(file)
// 			} else if (file.name.endsWith('.rar')) {
// 				await handleRar(file)
// 			} else {
// 				alert('Поддерживаются только ZIP и RAR файлы.')
// 			}
// 		} catch (error) {
// 			console.error('Ошибка при чтении архива:', error)
// 		}
// 		set({loading: false})

// 	}

// 	const handleZip = async (file: File) => {
// 		const zip = await JSZip.loadAsync(file)
// 		const extractedFiles: FileData[] = []

// 		for (const fileName of Object.keys(zip.files)) {
// 			const zipFile = zip.files[fileName]
// 			if (!zipFile.dir) {
// 				const blob = await zipFile.async('blob')
// 				const url = URL.createObjectURL(blob)
// 				if (/\.(png|jpe?g|gif|webp)$/i.test(fileName))
// 					extractedFiles.push({ name: fileName, url, type: 'image' })
// 				else if (/\.(mp4|webm|ogg)$/i.test(fileName))
// 					extractedFiles.push({ name: fileName, url, type: 'video' })
// 			}
// 		}
// 		setFiles(extractedFiles)
// 	}

// 	handleRar = async (file: File) => {
// 		const extractor = await createExtractorFromFile({ file })
// 		const extractedFiles: FileData[] = []

// 		for await (const entry of extractor) {
// 			if (!entry.fileHeader.flags.directory) {
// 				const blob = new Blob([entry.extract().buffer])
// 				const name = entry.fileHeader.name
// 				const url = URL.createObjectURL(blob)
// 				if (/\.(png|jpe?g|gif|webp)$/i.test(name))
// 					extractedFiles.push({ name, url, type: 'image' })
// 				else if (/\.(mp4|webm|ogg)$/i.test(name))
// 					extractedFiles.push({ name, url, type: 'video' })
// 			}
// 		}
// 		setFiles(extractedFiles)
// 	}

// 	const clearFiles = () => setFiles([])

// 	return { files, loading, handleFile, clearFiles }
// }))
