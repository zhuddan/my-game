import type { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './ErrorFallback'

export default function ErrorElement({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}
