export { onBeforeRender, runOnBeforeRenderHooks }

import { PageContext } from 'vike/types'

type OnBeforeRenderHookFn = (pageContext: PageContext) => void | Promise<void>
const onBeforeRenderHooks: OnBeforeRenderHookFn[] = []
async function onBeforeRender(hook: OnBeforeRenderHookFn) {
  onBeforeRenderHooks.push(hook)
}

async function runOnBeforeRenderHooks(pageContext: PageContext) {
  for (const hook of onBeforeRenderHooks) {
    await hook(pageContext)
  }
}
