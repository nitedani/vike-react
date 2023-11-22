console.log("vike-react-query loaded");

export * from '@tanstack/react-query'

import type { Config } from 'vike/types'

export default {
  onBeforeRender: 'import:vike-react-query/renderer/onBeforeRender:onBeforeRender'
} satisfies Config
