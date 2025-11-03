import { useEffect } from 'react'

export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  isActive: boolean,
) {
  useEffect(() => {
    if (!isActive) return

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isActive, callback, ref])
}
