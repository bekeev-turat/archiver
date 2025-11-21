import Lottie from 'lottie-react'

interface AnimationLottieProps {
	animationPath: Record<string, unknown>
	className?: string
	width?: string | number
}

export const AnimationLottie: React.FC<AnimationLottieProps> = ({
	animationPath,
	className = '',
	width = '95%',
}) => {
	return (
		<Lottie
			className={className}
			animationData={animationPath}
			loop={true}
			autoplay={true}
			style={{ width }}
		/>
	)
}
