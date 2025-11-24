import type { FileData } from '../store/zip/zip.types'

export interface TreeNode {
	name: string
	path: string
	type: 'file' | 'folder'
	children?: TreeNode[]
	fileData?: FileData
}

interface TreeNodeMapNode extends Omit<TreeNode, 'children'> {
	children?: TreeNodeMap
}

type TreeNodeMap = Record<string, TreeNodeMapNode>

/**
 * Строит дерево файлов из плоского списка FileData
 */
export function buildFileTree(files: FileData[]): TreeNode[] {
	const root: TreeNodeMap = {}

	for (const file of files) {
		const parts = file.filePath.split('/').filter(Boolean)
		let current: TreeNodeMap = root

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i]
			const isLast = i === parts.length - 1
			const path = parts.slice(0, i + 1).join('/')

			if (!current[part]) {
				current[part] = {
					name: part,
					path,
					type: isLast ? 'file' : 'folder',
					children: isLast ? undefined : {},
				}
			}

			if (isLast) {
				current[part].fileData = file
			} else {
				if (!current[part].children) {
					current[part].children = {}
				}
				current = current[part].children as TreeNodeMap
			}
		}
	}

	const convertToArray = (node: TreeNodeMap): TreeNode[] => {
		return Object.values(node)
			.map((node) => ({
				...node,
				children: node.children
					? convertToArray(node.children)
					: undefined,
			}))
			.sort((a, b) => {
				// Сначала папки, потом файлы
				if (a.type !== b.type) {
					return a.type === 'folder' ? -1 : 1
				}
				// Внутри одного типа сортируем по имени
				return a.name.localeCompare(b.name)
			})
	}

	return convertToArray(root)
}

