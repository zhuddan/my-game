import { useTick } from '@pixi/react'
import { useMemo, useState } from 'react'
import { DESIGN } from '~/constants/config'
import BaseSprite from '../BaseSprite'
import GameArrow from './GameArrow'

interface GameBarProps {
  needles?: number[]
}
const radius = 100
const EmptyArray: number[] = []
export default function GameBar({
  needles = EmptyArray,
}: GameBarProps) {
  const [value, setvalue] = useState(0)
  useTick(() => {
    setvalue(a => a = (a += 0.01 * 1) % (Math.PI * 2))
  })
  function getPosition(angle: number) {
    angle = angle % (2 * Math.PI)
    const x = Math.sin(angle) * radius
    const y = Math.cos(angle) * radius
    return {
      x,
      y,
      rotation: -angle,
    }
  }
  const data = useMemo(() => {
    const deg = Math.PI / 180
    return needles.map(e => ({
      key: e,
      ...getPosition(deg * e),
    }))
  }, [needles])
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
          g.circle(0, 0, radius)
          g.setStrokeStyle({
            color: '#000',
            width: 10,
          })
          g.stroke()
          g.fill()
        }}
      >
      </pixiGraphics>
      <BaseSprite anchor={0.5} texture="Chicken" />
      {
        data.map(({ key, ...props }) => {
          return (
            <GameArrow
              key={key}
              {...props}
            />
          )
        })
      }
    </pixiContainer>
  )
}
