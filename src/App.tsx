import {
  Application,
  extend,
} from '@pixi/react'
import { Scrollbox } from 'pixi-scrollbox'
import { Viewport } from 'pixi-viewport'
import {
  Container,
  Graphics,
  Sprite,
  Text,
} from 'pixi.js'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { DESIGN } from '~/constants/config'

import Loading from '~/ui/Loading'
import AppRooter from './routes'
import ErrorElement from './ui/error/ErrorElement'
import GridLine from './ui/GridLine'

extend({
  Container,
  Graphics,
  Sprite,
  Scrollbox,
  Text,
  Viewport,
})

let dpr = (window.devicePixelRatio || 1)
dpr = dpr >= 3 ? 3 : dpr

export default function App() {
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
          <GridLine />
          <ErrorElement>
            {
              isLoad
                ? <AppRooter />
                : <Loading onFinish={() => setIsLoad(true)} />
            }
          </ErrorElement>
        </Application>
      </div>
    </div>
  )
}
