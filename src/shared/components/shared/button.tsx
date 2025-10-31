import React from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lab/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline'
	children: React.ReactNode
	className?: string
	onClick?: () => void
	link?: string
}

export const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	children,
	onClick,
	className,
	link = '',
	...props
}) => {
	// Общие классы для всех кнопок
	const baseClasses =
		'flex justify-center items-center font-bold text-base rounded-[4px] h-[45px] py-[15px] px-[30px] transition-colors duration-200 box-border'

	// Классы для Primary
	const primaryClasses =
		'bg-[rgba(0,94,162,1)] hover:bg-[rgba(26,68,128,1)] active:bg-[rgba(22,46,81,1)] text-white'

	// Классы для Secondary
	const secondaryClasses =
		'bg-[rgba(216,57,51,1)] border-none text-white hover:bg-[rgba(181,29,9,1)] active:bg-[rgba(139,19,3,1)]'

	// Классы для Outline
	const outlineClasses =
		'border-2 border-[rgba(0,94,162,1)] rounded-[4px] text-[rgba(0,94,162,1)] bg-transparent hover:bg-[rgba(0,94,162,0.1)] active:bg-[rgba(0,94,162,0.2)]'

	const variantClasses =
		variant === 'primary'
			? primaryClasses
			: variant === 'secondary'
			? secondaryClasses
			: outlineClasses

	if (link) {
		const { ...linkProps } = props // исключаем несовместимые props
		return (
			<Link
				className={cn(className, baseClasses, variantClasses)}
				{...(linkProps as LinkProps)}
				to={link}
			>
				{children}
			</Link>
		)
	}

	return (
		<button
			className={cn(className, baseClasses, variantClasses)}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	)
}
