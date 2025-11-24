import type { FileData } from "@/shared/store/zip/zip.types";

export const VideoViewer: React.FC<{ file: FileData }> = ({ file }) =>
	file.blob ? (
		<div className='w-full flex items-center justify-center'>
			<video
				controls
				className='max-w-full max-h-[80vh] rounded-lg shadow-lg'
				src={URL.createObjectURL(file.blob)}
			/>
		</div>
	) : null
