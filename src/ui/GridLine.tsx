import { DESIGN } from '~/constants/config'

export default function GridLine() {
  return (
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
  )
}
