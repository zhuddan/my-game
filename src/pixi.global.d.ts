import type { PixiReactElementProps } from '@pixi/react'
import type { ScrollBox } from '@pixi/ui'

declare module '@pixi/react' {
  interface PixiElements {
    pixiScrollBox: PixiReactElementProps<typeof ScrollBox>
  }
}
