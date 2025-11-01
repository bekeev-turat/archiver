'use client'

import React from 'react'
import { useZipPreview } from '../store/zip-store'

export const FileListAnalyzer: React.FC = () => {
	const files = useZipPreview((state) => state.files)

	if (files.length === 0) {
		return (
			<div className='p-4'>
				<h2 className='text-lg font-semibold mb-2'>
					Результат анализа ZIP-файла
				</h2>
				<p>Файлы ещё не загружены</p>
			</div>
		)
	}

	const hasImage = files.some((f) => f.type === 'image')
	const hasVideo = files.some((f) => f.type === 'video')
	const suspiciousFiles = files.filter(
		(f) => f.suspiciousReasons && f.suspiciousReasons.length > 0,
	)

	return (
		<div className='p-4'>
			<h2 className='text-lg font-semibold mb-2'>
				Результат анализа ZIP-файла
			</h2>

			<p>
				Типы файлов:
				{hasImage && ' 🖼️ изображения'}
				{hasVideo && ' 🎥 видео'}
				{!hasImage && !hasVideo && ' ❌ нет медиа'}
			</p>

			{suspiciousFiles.length > 0 ? (
				<div className='bg-red-100 p-3 rounded-lg mt-2'>
					<p className='font-semibold text-red-700'>
						⚠️ Найдены подозрительные файлы:
					</p>
					<ul className='list-disc list-inside text-red-600'>
						{suspiciousFiles.map((f, i) => (
							<li key={i}>
								<b>{f.name}</b> — {f.suspiciousReasons?.join(', ')}
							</li>
						))}
					</ul>
				</div>
			) : (
				<p className='text-green-600 font-medium mt-2'>
					✅ Подозрительных файлов не найдено
				</p>
			)}
		</div>
	)
}
