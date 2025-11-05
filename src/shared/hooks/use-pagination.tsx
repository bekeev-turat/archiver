export function usePagination(totalPages: number, currentPage: number) {
	const getPages = () => {
		const delta = 2
		const range: (number | string)[] = []
		let last: number | undefined

		for (let i = 1; i <= totalPages; i++) {
			const isEdge = i === 1 || i === totalPages
			const isNear = i >= currentPage - delta && i <= currentPage + delta

			if (isEdge || isNear) {
				if (last && i - last !== 1) range.push('ellipsis')
				range.push(i)
				last = i
			}
		}
		return range
	}

	return { pages: getPages() }
}
