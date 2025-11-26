import { FileTreeFile } from './file-tree-file'
import { FileTreeFolder } from './file-tree-folder'
import { useParams } from 'react-router-dom'
import type { TreeNode } from '@/shared/lab/file-tree'
import { isFileNode } from '@/shared/lab/file-tree'
import { SidebarMenuSub } from '../ui/sidebar'
import { useFileTreeItem } from '@/shared/hooks/use-file-tree-item'

interface FileTreeItemProps {
	node: TreeNode
	level?: number
}

export const FileTreeItem: React.FC<FileTreeItemProps> = ({
	node,
	level = 0,
}) => {
	const { id } = useParams<{ id: string }>()
	const { isOpen, isActive, hasChildren, handleToggle } = useFileTreeItem({
		id: id || '',
		node,
		level,
	})

	if (isFileNode(node)) {
		return <FileTreeFile node={node} level={level} isActive={isActive} />
	}

	const childrenNodes =
		hasChildren && isOpen ? (
			<SidebarMenuSub>
				{node.children.map((child) => (
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
