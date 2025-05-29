import { useTick } from '@pixi/react'
import { useState } from 'react'
import { DESIGN } from '~/constants/config'

export default function GameArrow() {
  const [y, setY] = useState(DESIGN.HEIGHT)
  useTick({
    callback: () => {
      setY((y) => {
        if (y <= -DESIGN.HEIGHT) {
          return DESIGN.HEIGHT
        }
        return y -= 10
      })
    },
    isEnabled: false,
  })
  const w = 20
  const h = 120
  return (
    <pixiContainer
      y={y}
      anchor={{ x: 0.5, y: 1 }}
      x={DESIGN.WIDTH / 2}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear()
          g.roundRect(-w / 2, -h, w, h)
          g.setFillStyle({
            color: '#ffcffc',
          })
          g.fill()
        }}
      >
      </pixiGraphics>
    </pixiContainer>
  )
}
