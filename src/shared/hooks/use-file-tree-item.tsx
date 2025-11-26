import type { TreeNode } from "../lab/file-tree"
import { useInitialOpen } from "./use-initial-open"

export const useFileTreeItem = ({
	id,
	level,
	node,
}: {
	id: string
	level: number
	node: TreeNode
}) => {
	const [isOpen, setIsOpen] = useInitialOpen(level)

	const isActive = node.type === 'file' && node.fileData?.id === Number(id)
	const hasChildren =
		node.type === 'folder' &&
		Array.isArray(node.children) &&
		node.children.length > 0

	const handleToggle = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		if (hasChildren) {
			setIsOpen((open) => !open)
		}
	}

	return { isOpen, isActive, hasChildren, handleToggle }
}