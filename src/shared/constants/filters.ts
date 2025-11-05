import type { SuspiciousFilter } from '../store/filters/filters.types'

export const suspiciousOptions: Record<SuspiciousFilter, string> = {
	hasSuspicious: 'Подозрительные файлы',
	noSuspicious: 'Неподлежающие сомнению',
}
