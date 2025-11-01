// import { FileList } from '../components/file-list'
import { FileListAnalyzer } from '../components/file-list-analyzer'
import { FileUploader } from '../components/file-uploader'

export default function Home() {
	return (
		<div>
			<div id='root'>
				<FileUploader />
				<FileListAnalyzer />
				{/* <FileList /> */}
				{/* <Statistics /> */}
			</div>
		</div>
	)
}
