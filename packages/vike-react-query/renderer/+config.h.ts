import type { Config } from 'vike/types'
// What I tried:

// 1. define a custom hook "setupReactQuery", create a file "./+setupReactQuery.tsx" -> the hook is never called

// 2. define "onRenderClient" and "onRenderHtml", then call "vike-react/renderer/onRender*" ->
//    ->  the "onRender*" is randomly picked between "vike-react" and "vike-ract-query", even if it worked
//    it wouldn't be good, because then "vike-react-query" and "vike-react" would be coupled

// 3. define "onBeforeRender" -> never called on client, even if it worked
//    ->  it wouldn't be good, because it can be overridden by user onBeforeRender

export default {
  // onBeforeRender: 'import:vike-react-query/renderer/onBeforeRender:onBeforeRender',
  meta: {
    // onBeforeRender: {
    //   env: {
    //     server: true,
    //     // onBeforeRender still doesn't run on client...
    //     // but even if it did, it wouldn't be good, because it can be overridden by user onBeforeRender
    //     client: true
    //   }
    // },
    // this would be nice
    // setupReactQuery: {
    //   source: "import:vike-react-query/renderer/onBeforeRender:onBeforeRender",
    //   env: {
    //     server: true,
    //     client: true
    //   }
    // }
    // or this
    // 'import:vike-react-query/renderer/onBeforeRender:onBeforeRender': {
    //   env: {
    //     server: true,
    //     client: true
    //   }
    // }
  }

  // or this (cumulative with other configs)
  // server: "import:vike-react-query/renderer/setupReactQuery:setupReactQuery",
  // client: "import:vike-react-query/renderer/setupReactQuery:setupReactQuery"
} satisfies Config

// I couldn't find a place to register my hook
// Basically, the only thing needed to make vike-react-query work(when using react-streaming), is that the function in ./onBeforeRender.tsx
// to be called on every server/client render

//(./setupReactQuery.ts is my desperate attempt)
