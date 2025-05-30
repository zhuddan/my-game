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
  const w = 4
  const h = 200
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
          g.circle(0, h, 10)
          g.roundRect(-w / 2, 0, w, h)
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
