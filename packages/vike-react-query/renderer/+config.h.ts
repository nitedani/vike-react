import type { QueryClient, QueryClientConfig } from '@tanstack/react-query'

export default {
  queryClientConfig: undefined,
  internalOnBeforeRenderAll: 'import:vike-react-query/renderer/internalOnBeforeRenderAll:default',
  meta: {
    queryClientConfig: {
      env: {
        server: true,
        client: true
      }
    }
  }
}
declare global {
  namespace VikePackages {
    interface ConfigVikeReact {
      queryClientConfig: QueryClientConfig
    }
  }
}
