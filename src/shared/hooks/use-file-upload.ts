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

	const handleButtonClick = () => {
		inputRef.current?.click()
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			loadZip(file)
			reset()
			navigate('archiver', { replace: true })
		}
	}

	useZipToasts(loading, files)

	return { inputRef, handleButtonClick, handleChange, files }
}

function useZipToasts(loading: boolean, files: unknown[]) {
	const prevLoadingRef = useRef<boolean>(loading)
	const prevFilesRef = useRef<typeof files>(files)

	useEffect(() => {
		const prevLoading = prevLoadingRef.current
		const prevFiles = prevFilesRef.current

		const loadingChanged = loading !== prevLoading
		const filesChanged = files !== prevFiles

		if (loadingChanged || filesChanged) {
			if (loading) {
				toastService.loading('Загрузка ZIP-файла...')
			}
			if (!loading && files.length > 0 && (loadingChanged || filesChanged)) {
				toastService.success(`${files.length} файлов загружено!`)
			}
			if (!loading && files.length === 0 && prevLoading) {
				toastService.error('Не удалось загрузить ZIP-файл')
			}
		}

		prevLoadingRef.current = loading
		prevFilesRef.current = files
	}, [loading, files])
}