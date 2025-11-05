import { useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/use-click-outside'
import { cn } from '../../lab/utils'

interface Props {
	options: string[] | undefined
	onChange?: (value: string) => void
	defaultValue?: string
	variant: 'text' | 'grey'
	className?: string
}

export function InputSelect({
	options,
	variant,
	onChange,
	defaultValue,
	className,
}: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const [value, setValue] = useState(defaultValue ?? '')

	const colorStyles = {
		grey: 'bg-[#f5f5f5] text-[#6a6a6a] py-3 px-4 border border-[#e5e5e5]',
		text: 'bg-none text-[rgba(0,94,162,1)]',
	}

	const selectRef = useRef<HTMLDivElement>(null)
	useClickOutside(selectRef, () => setIsOpen(false), isOpen)

	const toggleOpen = () => setIsOpen((prev) => !prev)

	const setValueChange = (value: string) => {
		setValue(value)
		onChange?.(value)
		toggleOpen()
	}

	return (
		<div
			ref={selectRef}
			className={cn('relative select-none w-full', className)}
		>
			{/* Кнопка */}
			<div
				onClick={toggleOpen}
				className={cn(
					'flex justify-between rounded-md cursor-pointer transition text-center',
					{ 'bg-white': isOpen },
					colorStyles[variant],
				)}
			>
				{value}
			</div>

			{/* Список */}
			{isOpen && (
				<ul className='absolute text-center top-[110%] left-0 w-full bg-white border border-[#e5e5e5] rounded-md z-90 shadow-[0_4px_6px_rgba(255,126,0,0.2)] overflow-hidden'>
					{options?.map((option, index) => (
						<li
							key={index}
							onClick={() => setValueChange(option)}
							className='cursor-pointer px-4 py-3 text-[14px] font-normal hover:bg-accent border-b last:border-b-0 border-[#e5e5e5]'
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
