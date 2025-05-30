import { DESIGN } from '~/constants/config'

export default function GameAction() {
  const diff = 150
  function don() {
    // eslint-disable-next-line no-console
    console.log('1')
  }
  return (
    <pixiGraphics
      eventMode="static"
      onPointerDown={don}
      y={diff}
      alpha={0}
      draw={(g) => {
        g.clear()
        g.roundRect(0, 0, DESIGN.WIDTH, DESIGN.HEIGHT - diff)
        g.fill()
      }}
    >
    </pixiGraphics>
  )
}
