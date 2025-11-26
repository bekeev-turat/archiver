import type { TreeNode } from '@/shared/lab/file-tree'
import { SidebarMenu } from '../ui/sidebar'
import { FileTreeItem } from './file-tree-item'

interface FileTreeProps {
	tree: TreeNode[]
}

export const FileTree: React.FC<FileTreeProps> = ({ tree }) => {
	if (!tree.length) {
		return (
			<div className='px-2 py-4 text-sm text-muted-foreground text-center'>
				Нет файлов для отображения
			</div>
		)
	}

	return (
		<SidebarMenu>
			{tree.map((node) => (
				<FileTreeItem key={node.path} node={node} />
			))}
		</SidebarMenu>
	)
}
