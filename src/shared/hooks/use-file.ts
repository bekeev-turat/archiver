import { useParams } from 'react-router-dom'
import { useZipStore } from '../store/zip/zip.store'
import { useShallow } from 'zustand/shallow'
import { useMemo } from 'react'

export const useFile = () => {
	const { id } = useParams<{ id: string }>()
	const files = useZipStore(useShallow((state) => state.files))

	const file = useMemo(
		() => files.find((file) => file.id === Number(id)),
		[files, id]
	)

	return file
}
