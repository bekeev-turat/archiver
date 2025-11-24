import { FileTreeFile } from './file-tree-file'
import { FileTreeFolder } from './file-tree-folder'
import { useParams } from 'react-router-dom'
import type { TreeNode } from '@/shared/lab/file-tree'
import { useInitialOpen } from '@/shared/hooks/use-initial-open'
import { SidebarMenuSub } from '../ui/sidebar'

interface FileTreeItemProps {
	node: TreeNode
	level?: number
}
export const FileTreeItem: React.FC<FileTreeItemProps> = ({
	node,
	level = 0,
}) => {
	const { id } = useParams<{ id: string }>()
	const [isOpen, setIsOpen] = useInitialOpen(level)
	const isActive = node.fileData?.id === Number(id)
	const hasChildren = Array.isArray(node.children) && node.children.length > 0

	const handleToggle = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		if (hasChildren) {
			setIsOpen((open) => !open)
		}
	}

	if (node.type === 'file') {
		return <FileTreeFile node={node} level={level} isActive={isActive} />
	}
	const childrenNodes =
		hasChildren && isOpen ? (
			<SidebarMenuSub>
				{node.children!.map((child) => (
					<FileTreeItem key={child.path} node={child} level={level + 1} />
				))}
			</SidebarMenuSub>
		) : null

	return (
		<FileTreeFolder
			node={node}
			level={level}
			isOpen={isOpen}
			onToggle={handleToggle}
			childrenNodes={childrenNodes}
		/>
	)
}
