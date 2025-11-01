import { Link, useLocation } from 'react-router-dom'
import { useZipPreview } from '../store/zip-store'
export const Header = () => {
	const location = useLocation()
	const files = useZipPreview((state) => state.files)

	return (
		<header className='flex justify-between items-center max-w-7xl mx-auto py-5 px-2'>
			<div className='flex gap-2 font-bold text-3xl'>
				<img className='w-9 h-9' src='/file_archive.svg' alt='logo' /> Archiver
			</div>

			<div className='flex gap-3 text-xl'>
				{files.length > 0 && location.pathname !== '/archiver' && (
					<Link rel='stylesheet' to='/archiver'>
						Архиватор
					</Link>
				)}
				<Link rel='stylesheet' to='/about'>
					О приложении
				</Link>
			</div>
		</header>
	)
}
