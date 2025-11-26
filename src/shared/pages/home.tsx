import { Outlet } from 'react-router-dom'
import { FileUploader } from '../components/file-uploader'

export default function Home() {
	return (
		<div className='px-3 lg:px-5'>
			<FileUploader />
			<Outlet />
		</div>
	)
}
