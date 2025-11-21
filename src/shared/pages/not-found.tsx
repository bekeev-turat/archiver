import { Button } from '../components/ui/button'
import ErrorCat from '../../../public/404_error_cat.json'
import { AnimationLottie } from '../components/ui/animation-lottie'

export function NotFound() {
	return (
		<div className='min-h-screen flex justify-center items-center'>
			<div className=' flex flex-col items-center justify-between'>
				<AnimationLottie animationPath={ErrorCat} width={'50%'} />

				<p className='mt-5 text-[rgba(93,95,94,1)] font-montserrat text-xs md:text-base font-medium leading-5 tracking-[0%] text-center'>
					Возможно, запрошенная страница временно недоступона или удалена
				</p>
				<Button size={'lg'} className='mt-5' link='/'>
					Перейти на главную
				</Button>
			</div>
		</div>
	)
}
