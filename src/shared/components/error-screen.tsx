import { AnimationLottie } from './ui/animation-lottie'
import ErrorCat from '../../../public/error_cat.json'

export function ErrorScreen() {
	return (
		<div className='min-h-screen flex justify-center items-center'>
			<div className=' flex flex-col items-center justify-between'>
				<h3 className='mt-5 text-[rgba(93,95,94,1)] font-montserrat text-base font-medium leading-5 tracking-[0%] text-center'>
					МЫ в данный момент выясняем проблему
				</h3>
				<AnimationLottie animationPath={ErrorCat} width={'50%'} />
			</div>
		</div>
	)
}
