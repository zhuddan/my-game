import { useEffect, useRef } from 'react'

export function useGameRef<T>(callback?: (instance: T) => void) {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    if (ref.current) {
      callback?.(ref.current)
    }
  }, [callback])
  return ref
}
