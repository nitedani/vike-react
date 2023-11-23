export { onBeforeRender }

import React from 'react'
import 'vike-react'
import { PageContext } from 'vike/types'
import { StreamedHydration } from './StreamedHydration'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClientGlobal = import.meta.env.SSR ? undefined : new QueryClient()

async function onBeforeRender(pageContext: PageContext) {
  const { Page } = pageContext
  if (Page) {
    const queryClient = queryClientGlobal ?? new QueryClient()
    pageContext.Page = (props) => (
      <QueryClientProvider client={queryClient}>
        <StreamedHydration />
        <Page {...props} />
      </QueryClientProvider>
    )
  }
}
