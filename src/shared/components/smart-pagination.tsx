import { usePagination } from '@/shared/hooks/use-pagination'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination'
interface SmartPaginationProps {
	page: number
	totalPages: number
	onChange: (page: number) => void
}

export function SmartPagination({
	page,
	totalPages,
	onChange,
}: SmartPaginationProps) {
	const { pages } = usePagination(totalPages, page)

	return (
		<Pagination className='flex justify-center mt-6'>
			<PaginationContent>
				{page > 1 && (
					<PaginationItem>
						<PaginationPrevious onClick={() => onChange(page - 1)}>
							Prev
						</PaginationPrevious>
					</PaginationItem>
				)}

				{pages.map((p, i) =>
					p === 'ellipsis' ? (
						<PaginationItem key={`ellipsis-${i}`}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={`page-${p}`}>
							<PaginationLink
								href={'#top'}
								isActive={p === page}
								onClick={() => onChange(Number(p))}
							>
								{p}
							</PaginationLink>
						</PaginationItem>
					),
				)}

				{page < totalPages && (
					<PaginationItem>
						<PaginationNext onClick={() => onChange(page + 1)}>
							Next
						</PaginationNext>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	)
}
