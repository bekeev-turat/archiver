import { cn } from '@/shared/lab/utils'
import { FaArrowDownLong } from 'react-icons/fa6'

export function ScrollIndicator({ className }: { className?: string }) {
	return (
		<div className={cn('absolute bottom-10 animate-bounce', className)}>
			<FaArrowDownLong className='w-5 h-5' />
		</div>
	)
}
