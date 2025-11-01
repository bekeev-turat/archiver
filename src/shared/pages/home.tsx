import { Outlet } from 'react-router-dom'
import { FileUploader } from '../components/file-uploader'

export default function Home() {
	return (
		<main className='px-3 lg:px-5 '>
			<FileUploader />
			<Outlet />
		</main>
	)
}
