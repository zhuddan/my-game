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
import { type ReactNode, useState } from 'react'
import { useWindowSize } from 'react-use'
import Loading from '~/components/Loading'

extend({
  Container,
  Graphics,
  Sprite,
  Text,
})

const dpr = window.devicePixelRatio || 1

const DESIGN_WIDTH = 750
const DESIGN_HEIGHT = 1334

export default function Layout({ children }: { children?: ReactNode }) {
  const [isLoad, setIsLoad] = useState(false)
  const { width, height } = useWindowSize()
  const isWideScreen = ((width / height) / (750 / 1334)) >= 1

  return (
    <div id="game-container" className={isWideScreen ? 'wide' : 'long'}>
      <p style={{ fontFamily: 'Snippet' }}>做杯奶茶吧abc123</p>
      <div className="game-canvas">
        <Application
          resolution={dpr}
          autoDensity
          width={DESIGN_WIDTH}
          height={DESIGN_HEIGHT}
          className="pixi-canvas"
          backgroundAlpha={0}
          defaultTextStyle={{
            // fontFamily: 'FusionPixel',
          }}
        >
          {isLoad ? children : <Loading onFinish={() => setIsLoad(true)} />}
        </Application>
      </div>
    </div>
  )
}
