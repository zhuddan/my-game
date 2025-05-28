import type { PixiReactElementProps } from '@pixi/react'
import type { Scrollbox } from 'pixi-scrollbox'
import type { Viewport } from 'pixi-viewport'

declare module '@pixi/react' {
  interface PixiElements {
    pixiScrollbox: PixiReactElementProps<typeof Scrollbox>
    pixiViewport: PixiReactElementProps<typeof Viewport>
  }
}
