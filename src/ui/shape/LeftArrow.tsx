export default function LeftArrow() {
  return (
    <pixiGraphics
      draw={(graphics) => {
        graphics.clear()
        graphics.moveTo(50, 20)
        graphics.lineTo(20, 40)
        graphics.lineTo(50, 60)
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
