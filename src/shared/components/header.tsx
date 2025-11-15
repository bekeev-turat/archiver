import { Link, useLocation } from 'react-router-dom'
import { useZipStore } from '../store/zip/zip.store'
import { FaFileArchive } from 'react-icons/fa'
import { Info } from 'lucide-react'
export const Header = () => {
	const location = useLocation()
	const files = useZipStore((state) => state.files)

	return (
		<header className='flex justify-between items-center max-w-7xl mx-auto py-5 px-2'>
			<div className='flex gap-2 font-bold text-3xl'>
				<img className='w-9 h-9' src='/file_archive.svg' alt='logo' /> Archiver
			</div>

			<div className='flex gap-3 text-xl'>
				{files.length > 0 && location.pathname !== '/archiver' && (
					<Link
						rel='stylesheet'
						className='flex gap-2 items-center'
						to='/archiver'
					>
						<FaFileArchive /> Архиватор
					</Link>
				)}
				{files.length > 0 && location.pathname !== '/about' && (
					<Link
						rel='stylesheet'
						className='flex gap-2 items-center'
						to='/about'
					>
						<Info />О приложении
					</Link>
				)}
			</div>
		</header>
	)
}
