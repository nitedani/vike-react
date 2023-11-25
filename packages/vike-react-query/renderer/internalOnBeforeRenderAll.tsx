import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import 'vike-react'
import { PageContext } from 'vike/types'
import { StreamedHydration } from './StreamedHydration'

let queryClientGlobal: QueryClient | undefined

export default function internalOnBeforeRenderAll(pageContext: PageContext) {
  const {
    Page,
    config: { queryClientConfig, FallbackErrorBoundary = PassThrough }
  } = pageContext

  if (!Page) {
    return
  }

  if (!import.meta.env.SSR && !queryClientGlobal) {
    queryClientGlobal = new QueryClient(queryClientConfig)
  }
  const queryClient = queryClientGlobal ?? new QueryClient(queryClientConfig)

  if (Page) {
    pageContext.Page = (props) => (
      <>
        <StreamedHydration client={queryClient} />
        <QueryClientProvider client={queryClient}>
          <FallbackErrorBoundary>
            <Page {...props} />
          </FallbackErrorBoundary>
        </QueryClientProvider>
      </>
    )
  }
}

function PassThrough({ children }: any) {
  return <>{children}</>
}
