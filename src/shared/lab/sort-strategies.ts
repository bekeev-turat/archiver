import type { SortFilter } from "../store/filters/filters.types";
import type { FileData } from "../store/zip/zip.types";

export const sortStrategies: Record<
	SortFilter,
	(a: FileData, b: FileData) => number
> = {
	nameAsc: (a, b) => a.name.localeCompare(b.name),
	nameDesc: (a, b) => b.name.localeCompare(a.name),
	sizeAsc: (a, b) => a.size - b.size,
	sizeDesc: (a, b) => b.size - a.size,
}
