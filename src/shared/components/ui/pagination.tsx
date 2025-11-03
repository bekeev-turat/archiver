'use client'

import React from 'react'
import { Button } from './button'

interface PaginationProps {
	page: number
	totalPages: number
	onPrev: () => void
	onNext: () => void
	className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
	page,
	totalPages,
	onPrev,
	onNext,
	className = '',
}) => {
	if (totalPages <= 1) return null

	return (
		<div className={`flex justify-center items-center gap-4 mt-6 ${className}`}>
			<Button variant='outline' onClick={onPrev} disabled={page === 1}>
				← Назад
			</Button>

			<span className='text-sm text-muted-foreground'>
				Страница {page} из {totalPages}
			</span>

			<Button variant='outline' onClick={onNext} disabled={page === totalPages}>
				Вперёд →
			</Button>
		</div>
	)
}
