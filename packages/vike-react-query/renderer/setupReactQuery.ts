import { onBeforeRender as onBeforeRenderVikeReact } from 'vike-react/renderer/internal-hooks'
import { onBeforeRender } from './onBeforeRender'
onBeforeRenderVikeReact(onBeforeRender)
