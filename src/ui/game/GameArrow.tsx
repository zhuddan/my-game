import { GameConfig } from '~/config'
import { DESIGN } from '~/constants/config'

type GameArrowProps = PixiContainerProps & {
  color?: string
}

export default function GameArrow({
  x = DESIGN.WIDTH / 2,
  y = 0,
  color = 'black',
  ...rest
}: GameArrowProps) {
  return (
    <pixiContainer
      y={y}
      x={x}
      {
        ...rest
      }
    >
      <pixiGraphics
        draw={(g) => {
          g.clear()
          g.circle(0, GameConfig.arrowHeight, GameConfig.arrowBallRadius)
          g.roundRect(-GameConfig.arrowWidth / 2, 0, GameConfig.arrowWidth, GameConfig.arrowHeight)
          g.setFillStyle({
            color,
          })
          g.fill()
        }}
      >
      </pixiGraphics>
    </pixiContainer>
  )
}
