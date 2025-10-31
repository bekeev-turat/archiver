import { FileList } from '../components/file-list'
import { FileListAnalyzer } from '../components/file-list-analyzer'
import { FileUploader } from '../components/file-uploader'
import { Statistics } from '../components/statistics'

export default function Home() {
	return (
		<div>
			<div id='root' className='flex'>
				<div className='max-w-[1000px] w-full'>
					<FileUploader />
					<FileListAnalyzer />
					<FileList />
				</div>
				<Statistics />
			</div>
		</div>
	)
}
