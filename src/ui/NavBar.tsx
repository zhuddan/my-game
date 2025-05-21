import type { Graphics } from 'pixi.js'
import { useNavigate } from 'react-router-dom'
import Button from '~/ui/Button'
import Title from '~/ui/Title'

export default function NavBar({ title }: { title?: string }) {
  const navigate = useNavigate()
  return (
    <>
      <Button
        onClick={() => navigate(-1)}
        width={80}
        height={80}
        radius={80}
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
      <Title size="small" title={title} y={25} animate={false} />
    </>
  )
}
