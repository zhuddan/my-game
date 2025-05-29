import { useTick } from '@pixi/react'
import { useState } from 'react'
import { DESIGN } from '~/constants/config'
import BaseSprite from '../BaseSprite'

export default function GameBar() {
  const [value, setvalue] = useState(0)
  useTick(() => {
    setvalue(a => a = (a += 0.01) % (Math.PI * 2))
  })
  return (
    <pixiContainer
      y={500}
      rotation={value}
      anchor={0.5}
      x={DESIGN.WIDTH / 2}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear()
          g.circle(0, 0, 150)
          g.setStrokeStyle({
            color: 'red',
            width: 80,
          })
          g.stroke()
          g.fill()
        }}
      >
      </pixiGraphics>
      <BaseSprite anchor={0.5} texture="Chicken" />
    </pixiContainer>
  )
}
