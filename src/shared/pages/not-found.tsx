import { Button } from '../components/shared/button'

export function NotFound() {
	return (
		<div className='min-h-screen flex justify-center items-center'>
			<div className=' flex flex-col items-center justify-between'>
				<h1 className='class="text-[rgba(0,0,0,1)] font-montserrat text-[70px] font-bold leading-[85px] tracking-[0%] text-left"'>
					Страница не найдена
				</h1>
				<p className='mt-5 text-[rgba(93,95,94,1)] font-montserrat text-base font-medium leading-5 tracking-[0%] text-center'>
					Возможно, запрошенная страница временно недоступона или удалена
				</p>
				<Button className='mt-24' link='/'>
					Перейти на главную
				</Button>
			</div>
		</div>
	)
}

// className='mt-24 h-[45px] flex justify-between items-center py-[15px] px-[110px] rounded-md  bg-[rgba(250,213,73,1)]'
