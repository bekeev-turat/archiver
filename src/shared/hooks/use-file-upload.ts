import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useZipStore } from '../store/zip/zip.store'
import { useFiltersStore } from '../store/filters/filters.store'
import { useShallow } from 'zustand/shallow'
import { toastService } from '../services/toast-service'

export function useFileUpload() {
	const navigate = useNavigate()
	const [files, loadZip, loading] = useZipStore(
		useShallow((state) => [state.files, state.loadZip, state.loading]),
	)
	const reset = useFiltersStore(useShallow((state) => state.reset))

	const inputRef = useRef<HTMLInputElement>(null)

	const handleButtonClick = () => inputRef.current?.click()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			loadZip(file)
			reset()
			navigate('archiver', { replace: true })
		}
	}

	useEffect(() => {
		if (inputRef.current) inputRef.current.value = ''

		if (loading) toastService.loading('Загрузка ZIP-файла...')
		if (!loading && files.length > 0)
			toastService.success(`${files.length} файлов загружено!`)
	}, [loading, files])

	return { inputRef, handleButtonClick, handleChange, files }
}
