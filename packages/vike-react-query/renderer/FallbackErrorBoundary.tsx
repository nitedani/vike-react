import { QueryErrorResetBoundary } from '@tanstack/react-query'
import React, { CSSProperties, ReactElement } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default ({ children }: { children: ReactElement }) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary, error }) => (
          <div style={pageStyle}>
            <div style={textStyle}>Oops! There was an error.</div>
            <button style={buttonStyle} onClick={() => resetErrorBoundary()}>
              Try again
            </button>
            {import.meta.env.DEV && <pre>{getErrorStack(error)}</pre>}
          </div>
        )}
      >
        {children}
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)

function getErrorStack(error: unknown) {
  if (error && error instanceof Error) {
    return error.stack
  }

  return ''
}

const pageStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffe1e3',
  padding: 12
}

const textStyle = {
  fontSize: 20,
  fontWeight: 500,
  color: '#f44250'
}

const buttonStyle: CSSProperties = {
  fontSize: 18,
  fontWeight: 500,
  marginTop: 16,
  outline: 0,
  border: 0,
  color: '#272727',
  boxShadow: '0px 1px 2px 0px #ffc5c5',
  backgroundColor: '#fff',
  padding: '8px 12px',
  borderRadius: 16,
  cursor: 'pointer'
}
