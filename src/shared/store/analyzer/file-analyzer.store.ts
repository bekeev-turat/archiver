import { create } from 'zustand'
import { analyzeFiles } from '../../lab/file-analyzer'
import type { FileData } from '../zip/zip.types'
import type { FileStats } from './file-analyzer.type'

interface AnalyzerState {
	stats: FileStats
	analyze: (files: FileData[]) => void
	resetStats: () => void
}

const BASE_STATS: FileStats = {
	hasImage: false,
	hasVideo: false,
	hasText: false,
	hasOther: false,
	suspiciousFiles: [],
}

export const useAnalyzerStore = create<AnalyzerState>((set) => ({
	stats: BASE_STATS,
	analyze: (files) => set({ stats: analyzeFiles(files) }),
	resetStats: () => set({ stats: BASE_STATS }),
}))
