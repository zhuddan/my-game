import {
  Application,
  extend,
} from '@pixi/react'
import { ScrollBox } from '@pixi/ui'
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

extend({
  Container,
  Graphics,
  Sprite,
  Text,
  ScrollBox,
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
          {/* debug */}
          <pixiGraphics
            draw={(g) => {
              g.clear()
              g.setStrokeStyle({
                color: 0xCCCCCC,
                width: 2,
              })
              let x = 0
              while (x <= DESIGN.WIDTH) {
                g.moveTo(x, 0)
                g.lineTo(x, DESIGN.HEIGHT)
                x += 75
              }
              g.stroke()

              let y = 0
              while (y < DESIGN.HEIGHT) {
                g.moveTo(0, y)
                g.lineTo(DESIGN.HEIGHT, y)
                y += 75
              }
              g.stroke()
            }}
          />
          {
            isLoad
              ? <AppRooter />
              : <Loading onFinish={() => setIsLoad(true)} />
          }
        </Application>
      </div>
    </div>
  )
}
