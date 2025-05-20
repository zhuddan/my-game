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
import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import Loading from '~/components/Loading'
import { DESIGN } from '~/constants/config'

extend({
  Container,
  Graphics,
  Sprite,
  Text,
})

let dpr = (window.devicePixelRatio || 1)
dpr = dpr >= 3 ? 3 : dpr

export default function Layout({ children }: { children?: ReactNode }) {
  const [isLoad, setIsLoad] = useState(false)
  const { width, height } = useWindowSize()
  const isWideScreen = ((width / height) / (DESIGN.WIDTH / DESIGN.HEIGHT)) >= 1

  useEffect(() => {
    const vw = width * 0.01
    const vh = height * 0.01
    document.documentElement.style.setProperty('--vw', `${vw}px`)
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [height, width])

  return (
    <div id="game-container" className={isWideScreen ? 'wide' : 'long'}>
      <div className="debug-bar">
        {JSON.stringify({ width, height }, null, 2)}
      </div>
      <div className="game-canvas">
        <Application
          resolution={dpr}
          autoDensity
          width={DESIGN.WIDTH}
          height={DESIGN.HEIGHT}
          className="pixi-canvas"
          backgroundAlpha={0}
          defaultTextStyle={{ fontFamily: 'FusionPixel' }}
          sharedTicker
        >
          {isLoad ? children : <Loading onFinish={() => setIsLoad(true)} />}
        </Application>
      </div>
    </div>
  )
}
