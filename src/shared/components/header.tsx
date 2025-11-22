import { Link, useLocation } from 'react-router-dom'
import { useZipStore } from '../store/zip/zip.store'
import { FaFileArchive } from 'react-icons/fa'
import { Info } from 'lucide-react'
import catInBox from '../../../public/Cat_in_Box.json'
import { AnimationLottie } from './ui/animation-lottie'
export const Header = () => {
	const location = useLocation()
	const files = useZipStore((state) => state.files)

	return (
		<header className='fixed w-screen top-0 left-0 bg-sidebar z-1'>
			<div className='flex justify-between items-center max-w-7xl mx-auto px-3 py-2'>
				<div className='flex gap-2 font-bold text-3xl items-end text-primary'>
					<AnimationLottie animationPath={catInBox} width={'46px'} />
					Archiver
				</div>

				<div className='flex gap-3 text-xl'>
					{files.length > 0 && location.pathname !== '/archiver' && (
						<Link
							rel='stylesheet'
							className='flex gap-2 items-center text-primary animate-fadeIn'
							to='/archiver'
						>
							<FaFileArchive /> Архиватор
						</Link>
					)}
					{files.length > 0 && location.pathname !== '/about' && (
						<Link
							rel='stylesheet'
							className='flex gap-2 items-center text-primary animate-fadeIn'
							to='/about'
						>
							<Info />О приложении
						</Link>
					)}
				</div>
			</div>
			<div className='relative w-full'>
				<div className='w-3/4 mx-auto'>
					<div className='h-1 w-full bg-linear-to-r from-transparent via-chart-2 to-transparent opacity-70 blur-[0.3px]' />
				</div>
			</div>
		</header>
	)
}
