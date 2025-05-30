import { useMemo } from 'react'
import { useAppSelector } from '~/app/hooks'
import { selectTargetNeedles, selectTargetRotation } from '~/app/slices/gameSlice'
import { DESIGN } from '~/constants/config'
import BaseSprite from '../BaseSprite'
import GameArrow from './GameArrow'

const radius = 100
export default function GameTarget() {
  const rotation = useAppSelector(selectTargetRotation)
  const TargetNeedles = useAppSelector(selectTargetNeedles)

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
    return TargetNeedles.map(e => ({
      key: e,
      ...getPosition(deg * e),
    }))
  }, [TargetNeedles])
  return (
    <pixiContainer
      y={500}
      rotation={rotation}
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
