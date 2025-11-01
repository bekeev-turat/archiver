'use client'

import { useFilteredFiles } from '../hooks/useFilteredFiles'
import { FileFilter } from './file-filter'
import { FileCard } from './shared/file-card'
import { Space } from './shared/space'

export const FileList: React.FC = () => {
	const { files, loading } = useFilteredFiles()

	const downloadFile = (url: string, name: string) => {
		const a = document.createElement('a')
		a.href = url
		a.download = name
		a.click()
	}

	return (
		<>
			<FileFilter />
			<Space h={50} />
			{loading && <p>📦 Распаковка архива...</p>}

			{!loading && files.length === 0 && (
				<p>Файлы не найдены по выбранным фильтрам.</p>
			)}

			{files.length > 0 && (
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full'>
					{files.map((file) => (
						<FileCard key={file.name} file={file} onDownload={downloadFile} />
					))}
				</div>
			)}
		</>
	)
}
