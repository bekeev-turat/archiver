import { Link } from 'react-router-dom'
export const Header = () => {
	return (
		<header className='flex justify-between items-center max-w-7xl mx-auto py-5'>
			<div className='flex gap-2 font-bold text-3xl'>
				<img className='w-9 h-9' src='/file_archive.svg' alt='logo' /> Archiver
			</div>

			<div className='flex gap-3 text-xl'>
				<Link rel='stylesheet' to='/'>
					Главная
				</Link>
				<Link rel='stylesheet' to='/about'>
					Функции
				</Link>
			</div>
		</header>
	)
}
