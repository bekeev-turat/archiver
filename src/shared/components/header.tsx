import { Link, useLocation } from 'react-router-dom'
import { useZipStore } from '../store/zip/zip.store'
import { FaFileArchive } from 'react-icons/fa'
import { Info } from 'lucide-react'
import catInBox from '../../../public/Cat_in_Box.json'
import { AnimationLottie } from './ui/animation-lottie'
import { SidebarTrigger } from './ui/sidebar'

export const Header = () => {
	const location = useLocation()
	const files = useZipStore((state) => state.files)

	return (
		<header className='sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4'>
			<div className='flex gap-2 font-bold text-3xl items-end text-primary'>
				<AnimationLottie animationPath={catInBox} width={'46px'} />
				Archiver
			</div>

			<div className='ml-auto flex gap-3 text-xl'>
				{files.length > 0 && location.pathname !== '/archiver' && (
					<Link
						rel='stylesheet'
						className='flex gap-2 items-center text-sm text-primary animate-fadeIn'
						to='/archiver'
					>
						<FaFileArchive className='size-4' /> <span className='hidden sm:block'>Архиватор</span>
					</Link>
				)}

				{files.length > 0 && location.pathname === '/archiver' && (
					<Link
						rel='stylesheet'
						className='flex gap-2 items-center text-sm text-primary animate-fadeIn'
						to='/about'
					>
						<Info className='size-4' /> <span className='hidden sm:block'>О приложении</span>
					</Link>
				)}
				<SidebarTrigger className='text-primary' />
			</div>
		</header>
	)
}
