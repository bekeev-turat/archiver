import type { FileData } from "../zip/zip.types"

export interface FileStats {
  hasImage: boolean
  hasVideo: boolean
  hasText: boolean
  hasOther: boolean
  suspiciousFiles: FileData[]
}
