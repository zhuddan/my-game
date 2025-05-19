import type { ReactNode } from 'react'

import {
  Application,
  extend,
} from '@pixi/react'
import {
  Container,
  Graphics,
  Sprite,
  Text,
} from 'pixi.js'

// import { BunnySprite } from './BunnySprite'

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
  Text,
})

const dpr = window.devicePixelRatio || 1
export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <Application
      resolution={dpr}
      autoDensity
    >
      {children}
    </Application>
  )
}
