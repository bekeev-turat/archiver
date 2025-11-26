import type { FileData } from '../store/zip/zip.types'

export interface BaseNode {
	name: string
	path: string
	type: 'file' | 'folder'
}

export interface FileNode extends BaseNode {
	type: 'file'
	fileData: FileData
}

export interface FolderNode extends BaseNode {
	type: 'folder'
	children: TreeNode[]
}

export type TreeNode = FileNode | FolderNode

export const isFileNode = (node: TreeNode): node is FileNode =>
	node.type === 'file'

export const isFolderNode = (node: TreeNode): node is FolderNode =>
	node.type === 'folder'

interface FileNodeMapItem extends Omit<FileNode, 'type' | 'children'> {
	type: 'file'
}

interface FolderNodeMapItem extends Omit<FolderNode, 'type' | 'children'> {
	type: 'folder'
	children: TreeNodeMap
}

type TreeNodeMapNode = FileNodeMapItem | FolderNodeMapItem

type TreeNodeMap = Record<string, TreeNodeMapNode>

class FileNodeFactory {
	create(name: string, path: string, data: FileData): FileNode {
		return { name, path, type: 'file', fileData: data }
	}
}

class FolderNodeFactory {
	create(name: string, path: string): FolderNode {
		return { name, path, type: 'folder', children: [] }
	}
}

/**
 * Строит дерево файлов из плоского списка FileData
 */
export function buildFileTree(files: FileData[]): TreeNode[] {
	const mapBuilder = new TreeMapBuilder()
	const converter = new TreeConverter()

	const map = mapBuilder.buildMap(files)
	return converter.convert(map)
}

class TreeMapBuilder {
	private fileFactory = new FileNodeFactory()
	private folderFactory = new FolderNodeFactory()

	buildMap(files: FileData[]): TreeNodeMap {
		const root: TreeNodeMap = {}

		for (const file of files) {
			const parts = file.filePath.split('/').filter(Boolean)
			let current = root

			for (let i = 0; i < parts.length; i++) {
				const part = parts[i]
				const path = parts.slice(0, i + 1).join('/')
				const isLast = i === parts.length - 1

				if (!current[part]) {
					current[part] = isLast
						? this.fileFactory.create(part, path, file)
						: { ...this.folderFactory.create(part, path), children: {} }
				}

				if (!isLast) {
					const node = current[part]

					if (node.type !== 'folder') {
						throw new Error('Попытка пройти внутрь файла — невозможно')
					}

					current = node.children
				}
			}
		}

		return root
	}
}

class TreeConverter {
	convert(map: TreeNodeMap): TreeNode[] {
		return Object.values(map)
			.map((node) => {
				if (node.type === 'folder') {
					return {
						...node,
						children: this.convert(node.children),
					}
				}
				return node
			})
			.sort((a, b) => {
				if (a.type !== b.type) {
					return a.type === 'folder' ? -1 : 1
				}
				return a.name.localeCompare(b.name)
			})
	}
}
