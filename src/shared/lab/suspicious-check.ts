export const suspiciousExtensions = [
	'.exe',
	'.dll',
	'.bat',
	'.cmd',
	'.sh',
	'.js',
	'.jar',
	'.ps1',
	'.scr',
	'.vbs',
	'.msi',
	'.com',
]

export function extFromName(name: string) {
	const idx = name.lastIndexOf('.')
	return idx >= 0 ? name.slice(idx).toLowerCase() : ''
}

export async function readHeadBytes(
	file: File | string,
	bytes = 16,
): Promise<Uint8Array | null> {
	try {
		let blob: Blob
		if (typeof file === 'string') {
			const res = await fetch(file)
			const arrayBuffer = await res.arrayBuffer()
			blob = new Blob([arrayBuffer])
		} else {
			blob = file.slice(0, bytes)
		}
		const buf = await blob.arrayBuffer()
		return new Uint8Array(buf.slice(0, bytes))
	} catch {
		return null
	}
}

export async function checkSuspicious(
	fileName: string,
	fileOrUrl: File | string,
): Promise<string[]> {
	const reasons: string[] = []
	const ext = extFromName(fileName)

	if (suspiciousExtensions.includes(ext)) {
		reasons.push(`Подозрительное расширение ${ext}`)
	}

	const bytes = await readHeadBytes(fileOrUrl)
	if (bytes && bytes[0] === 0x4d && bytes[1] === 0x5a) {
		reasons.push('Сигнатура исполняемого файла (MZ)')
	}

	return reasons
}
