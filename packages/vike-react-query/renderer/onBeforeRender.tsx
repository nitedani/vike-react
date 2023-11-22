export { onBeforeRender }

import React from 'react'
import 'vike-react'
import { PageContext } from 'vike/types'
import { StreamedHydration } from './StreamedHydration'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// On client, the query client needs to persist between navigations on client side
const queryClientGlobal = import.meta.env.SSR ? undefined : new QueryClient()

async function onBeforeRender(pageContext: PageContext) {
  // On server, the query client needs to be created for each request context
  const queryClient = queryClientGlobal ?? new QueryClient()

  const { Page } = pageContext
  if (Page) {
    pageContext.Page = (props) => (
      <QueryClientProvider client={queryClient}>
        <div>HELLO WORLD</div>
        <StreamedHydration />
        <Page {...props} />
      </QueryClientProvider>
    )
  }

  return pageContext
}
