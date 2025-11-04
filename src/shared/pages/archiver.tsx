import { useEffect } from 'react'
import { FileListAnalyzer } from '../components/file-list-analyzer'
import { useZipStore } from '../store/zip/zip.store'
import { useShallow } from 'zustand/shallow'
import { useNavigate } from 'react-router-dom'

export const Archiver = () => {
	const [files, loading] = useZipStore(
		useShallow((state) => [state.files, state.loading]),
	)
	const navigate = useNavigate()

	useEffect(() => {
		if (files.length === 0 && !loading) {
			navigate('/about', { replace: true })
		}
	}, [files, loading, navigate])

	return <FileListAnalyzer />
}
