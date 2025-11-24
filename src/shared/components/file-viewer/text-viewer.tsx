import type { FileData } from "@/shared/store/zip/zip.types";
import { SyntaxHighlighter } from "../syntax-highlighter";

export const TextViewer: React.FC<{ file: FileData }> = ({ file }) =>
	!file.content ? (
		<div className='p-4 bg-muted rounded-lg text-center text-muted-foreground'>
			Содержимое файла недоступно
		</div>
	) : (
		<SyntaxHighlighter content={file.content} fileName={file.name} />
	)