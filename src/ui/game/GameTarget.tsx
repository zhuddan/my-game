import { useMemo } from 'react'
import { useAppSelector } from '~/app/hooks'
import { selectTargetNeedles, selectTargetRotation } from '~/app/slices/gameSlice'
import { GameConfig } from '~/config'
import { DESIGN } from '~/constants/config'
import BaseSprite from '../BaseSprite'
import GameArrow from './GameArrow'

export default function GameTarget() {
  const rotation = useAppSelector(selectTargetRotation)
  const TargetNeedles = useAppSelector(selectTargetNeedles)

  function getPosition(angle: number) {
    angle = angle % (2 * Math.PI)
    const x = Math.sin(angle) * GameConfig.gameTargetRadius
    const y = Math.cos(angle) * GameConfig.gameTargetRadius
    return {
      x,
      y,
      rotation: -angle,
    }
  }
  const data = useMemo(() => {
    return TargetNeedles.map(e => ({
      key: e,
      ...getPosition(e),
    }))
  }, [TargetNeedles])
  return (
    <pixiContainer
      y={GameConfig.gameTargeY}
      rotation={rotation}
      anchor={0.5}
      x={DESIGN.WIDTH / 2}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear()
          g.circle(0, 0, GameConfig.gameTargetRadius)
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
