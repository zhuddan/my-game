import { useEffect, useRef } from 'react'

export function useInstanceRef<T>(callback?: (instance: T) => void) {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    if (ref.current) {
      callback?.(ref.current)
    }
  }, [callback])
  return ref
}
