'use client'

import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { useZipPreview, type FileData } from '../store/zip-store'

type AnalysisResult = {
	hasImage: boolean
	hasVideo: boolean
	suspicious: Array<{ name: string; reason: string }>
}

// ⚠️ Расширения потенциально опасных файлов
const suspiciousExtensions = [
	'.exe',
	'.dll',
	'.bat',
	'.cmd',
	'.sh',
	'.js',
	'.jar',
	'.ps1',
	'.scr',
	'.vbs',
	'.msi',
	'.com',
]

// Получаем расширение файла
function extFromName(name: string) {
	const idx = name.lastIndexOf('.')
	return idx >= 0 ? name.slice(idx).toLowerCase() : ''
}

// Чтение первых байт файла — безопасно (нужно для доп. анализа)
async function readHeadBytes(
	urlOrFile: File | string,
	bytes = 16,
): Promise<Uint8Array | null> {
	try {
		let blob: Blob
		if (typeof urlOrFile === 'string') {
			const res = await fetch(urlOrFile)
			const arrayBuffer = await res.arrayBuffer()
			blob = new Blob([arrayBuffer])
		} else {
			blob = urlOrFile.slice(0, bytes)
		}
		const buf = await blob.arrayBuffer()
		return new Uint8Array(buf.slice(0, bytes))
	} catch (err) {
		console.warn('Ошибка чтения файла:', err)
		return null
	}
}

export const FileListAnalyzer: React.FC = () => {
	const [files] = useZipPreview(useShallow((state) => [state.files]))
	const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

	useEffect(() => {
		if (files.length === 0) return

		const analyze = async () => {
			const result: AnalysisResult = {
				hasImage: false,
				hasVideo: false,
				suspicious: [],
			}

			for (const file of files) {
				// типы
				if (file.type === 'image') result.hasImage = true
				if (file.type === 'video') result.hasVideo = true

				// расширение
				const ext = extFromName(file.name)
				if (suspiciousExtensions.includes(ext)) {
					result.suspicious.push({
						name: file.name,
						reason: `Подозрительное расширение ${ext}`,
					})
				}

				// можно дополнительно проверить "магические байты"
				const bytes = await readHeadBytes(file.url)
				if (bytes && bytes[0] === 0x4d && bytes[1] === 0x5a) {
					// MZ — сигнатура Windows exe
					result.suspicious.push({
						name: file.name,
						reason: 'Сигнатура исполняемого файла (MZ)',
					})
				}
			}

			setAnalysis(result)
		}

		analyze()
	}, [files])

	return (
		<div className='p-4'>
			<h2 className='text-lg font-semibold mb-2'>
				Результат анализа ZIP-файла
			</h2>

			{!files.length && <p>Файлы ещё не загружены</p>}

			{analysis && (
				<div className='space-y-2'>
					<p>
						Типы файлов:
						{analysis.hasImage && ' 🖼️ изображения'}
						{analysis.hasVideo && ' 🎥 видео'}
						{!analysis.hasImage && !analysis.hasVideo && ' ❌ нет медиа'}
					</p>

					{analysis.suspicious.length > 0 ? (
						<div className='bg-red-100 p-3 rounded-lg'>
							<p className='font-semibold text-red-700'>
								⚠️ Найдены подозрительные файлы:
							</p>
							<ul className='list-disc list-inside text-red-600'>
								{analysis.suspicious.map((s, i) => (
									<li key={i}>
										<b>{s.name}</b> — {s.reason}
									</li>
								))}
							</ul>
						</div>
					) : (
						<p className='text-green-600 font-medium'>
							✅ Подозрительных файлов не найдено
						</p>
					)}
				</div>
			)}
		</div>
	)
}
