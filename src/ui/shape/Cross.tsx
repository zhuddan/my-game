export default function Cross() {
  return (
    <pixiGraphics
      draw={(graphics) => {
        const offset = 25
        const max = 80 - offset
        graphics.clear()
        graphics.moveTo(0 + offset, 0 + offset)
        graphics.lineTo(max, max)
        graphics.moveTo(max, 0 + offset)
        graphics.lineTo(0 + offset, max)
        graphics.setStrokeStyle({
          color: 'white',
          width: 5,
          cap: 'round',
          join: 'round',
        })
        graphics.stroke()
        graphics.closePath()
      }}
    />
  )
}
