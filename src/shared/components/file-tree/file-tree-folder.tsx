import type { FolderNode } from '@/shared/lab/file-tree'
import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenuSubItem,
	SidebarMenuSubButton,
} from '../ui/sidebar'
import { ChevronRight, FolderOpen, Folder } from 'lucide-react'
import { cn } from '@/shared/lab/utils'

interface FileTreeFolderProps {
	node: FolderNode
	level: number
	isOpen: boolean
	onToggle: (e: React.MouseEvent) => void
	childrenNodes: React.ReactNode
}

export const FileTreeFolder: React.FC<FileTreeFolderProps> = ({
	node,
	level,
	isOpen,
	onToggle,
	childrenNodes,
}) => {
	const FolderIcon = isOpen ? FolderOpen : Folder

	if (level === 0) {
		return (
			<>
				<SidebarMenuItem>
					<SidebarMenuButton onClick={onToggle} className='pl-2' size='sm'>
						<ChevronRight
							className={cn(
								'size-4 shrink-0 transition-transform',
								isOpen && 'rotate-90',
							)}
						/>
						<FolderIcon className='size-4 shrink-0' />
						<span className='truncate'>{node.name}</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
				{childrenNodes}
			</>
		)
	}

	return (
		<>
			<SidebarMenuSubItem>
				<SidebarMenuSubButton onClick={onToggle} isActive={false}>
					<ChevronRight
						className={cn(
							'size-4 shrink-0 transition-transform',
							isOpen && 'rotate-90',
						)}
					/>
					<FolderIcon className='size-4 shrink-0' />
					<span className='truncate'>{node.name}</span>
				</SidebarMenuSubButton>
			</SidebarMenuSubItem>
			{childrenNodes}
		</>
	)
}
