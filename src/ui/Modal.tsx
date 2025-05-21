import type { Graphics } from 'pixi.js'
import { useCallback } from 'react'
import { DESIGN, Theme } from '~/constants/config'
import Button from './Button'

interface ModalProps {
  width?: number
  height?: number
}
export default function Modal({
  width = 500,
  height = 600,
}: ModalProps) {
  const borderWidth = 10

  const draw = useCallback((g: Graphics) => {
    const offset = borderWidth / 2
    g.clear()
    g.roundRect(
      offset - width / 2,
      offset - height / 2,
      width - offset,
      height - offset,
      20,
    )
    g.setFillStyle({
      color: Theme.bg,
    })
    g.fill()
    g.setStrokeStyle({
      color: Theme.primary,
      width: borderWidth,
    })
    g.stroke()
  }, [height, width])
  return (
    <>
      <pixiGraphics
        draw={(g) => {
          g.clear()
          g.rect(0, 0, DESIGN.WIDTH, DESIGN.HEIGHT)
          g.setFillStyle({
            color: Theme.masBg,
          })
          g.fill()
        }}
      >
      </pixiGraphics>
      <pixiGraphics
        x={DESIGN.WIDTH / 2}
        y={DESIGN.HEIGHT / 2}
        draw={draw}
      >
        <Button
          // onClick={() => navigate(-1)}
          width={80}
          round
          x={15}
          y={15}
        >
          <pixiGraphics
            draw={(graphics: Graphics) => {
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
        </Button>
      </pixiGraphics>
    </>

  )
}
