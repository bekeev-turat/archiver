import { useZipStore } from '@/shared/store/zip/zip.store'
import { useShallow } from 'zustand/shallow'
import { useMemo } from 'react'
import { buildFileTree } from '@/shared/lab/file-tree'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
} from '@/shared/components/ui/sidebar'
import { FileTree } from './file-tree'

export function AppSidebar() {
	const files = useZipStore(useShallow((state) => state.files))

	const fileTree = useMemo(() => {
		if (files.length === 0) return []
		return buildFileTree(files)
	}, [files])

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Файлы</SidebarGroupLabel>
					<SidebarGroupContent>
						<FileTree tree={fileTree} />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
