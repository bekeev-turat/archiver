import type { FileData } from "@/shared/store/zip/zip.types";

export const ImageViewer: React.FC<{ file: FileData }> = ({ file }) =>
  file.blob ? (
    <div className='w-full h-full flex items-center justify-center'>
      <img
        className='max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg'
        src={URL.createObjectURL(file.blob)}
        alt={file.name}
      />
    </div>
  ) : null