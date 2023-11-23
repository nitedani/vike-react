import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import 'vike-react'
import { PageContext } from 'vike/types'
import { StreamedHydration } from './StreamedHydration'

let queryClientGlobal: QueryClient | undefined

export default function internalOnBeforeRenderAll(pageContext: PageContext) {
  const { Page, config } = pageContext

  if (!import.meta.env.SSR && !queryClientGlobal) {
    queryClientGlobal = new QueryClient(config.queryClientConfig)
  }
  const queryClient = queryClientGlobal ?? new QueryClient(config.queryClientConfig)

  if (Page) {
    pageContext.Page = (props) => (
      <QueryClientProvider client={queryClient}>
        <StreamedHydration />
        <Page {...props} />
      </QueryClientProvider>
    )
  }
}
