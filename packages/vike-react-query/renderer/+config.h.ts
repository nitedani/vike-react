import type { QueryClient, QueryClientConfig } from '@tanstack/react-query'
import { ReactElement, ReactNode } from 'react'

export default {
  queryClientConfig: undefined,
  internalOnBeforeRenderAll: 'import:vike-react-query/renderer/internalOnBeforeRenderAll:default',
  FallbackErrorBoundary: 'import:vike-react-query/renderer/FallbackErrorBoundary:default',
  meta: {
    queryClientConfig: {
      env: {
        server: true,
        client: true
      }
    },
    FallbackErrorBoundary: {
      env: {
        server: true,
        client: true
      }
    },
  }
}

declare global {
  namespace VikePackages {
    interface ConfigVikeReact {
      queryClientConfig: QueryClientConfig
      FallbackErrorBoundary: (props: { children: ReactNode }) => ReactNode
    }
  }
}
