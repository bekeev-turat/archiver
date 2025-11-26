import { Link } from 'react-router-dom'
import { File } from 'lucide-react'
import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenuSubItem,
	SidebarMenuSubButton,
} from '../ui/sidebar'
import type { FileNode } from '@/shared/lab/file-tree'

interface FileTreeFileProps {
	node: FileNode
	level: number
	isActive: boolean
}

export const FileTreeFile: React.FC<FileTreeFileProps> = ({
	node,
	level,
	isActive,
}) => {
	const fileLink = (
		<Link to={`/view/${node.fileData.id}`}>
			<File className='size-4 shrink-0' />
			<span className='truncate'>{node.name}</span>
		</Link>
	)

	if (level === 0) {
		return (
			<SidebarMenuItem>
				<SidebarMenuButton
					asChild
					size='sm'
					isActive={isActive}
					className='pl-1'
				>
					{fileLink}
				</SidebarMenuButton>
			</SidebarMenuItem>
		)
	}

	return (
		<SidebarMenuSubItem>
			<SidebarMenuSubButton asChild isActive={isActive} size='sm'>
				{fileLink}
			</SidebarMenuSubButton>
		</SidebarMenuSubItem>
	)
}
