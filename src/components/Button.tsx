import type { ReactNode } from 'react'

interface ButtonProps {
  onClick?: () => void
  x?: number
  y?: number
  children?: ReactNode
}
export default function Button({
  onClick,
  x,
  y,
  children,
}: ButtonProps) {
  return (
    <pixiContainer
      y={y}
      x={x}
      eventMode="static"
      cursor="pointer"
      onClick={onClick}
    >
      <pixiGraphics
        draw={(graphics) => {
          graphics.clear()
          graphics.setFillStyle({ color: 'red', alpha: 0.5 })
          graphics.setStrokeStyle({ color: 'red', width: 4 })
          graphics.roundRect(0, 0, 180, 50, 10)
          graphics.fill()
          graphics.stroke()
        }}
      />
      {
        typeof children === 'string'
          ? (
              <pixiText
                text={children}
                style={{
                  fill: '#fff',
                }}
                anchor={0.5}
                x={90}
                y={25}
              />
            )
          : children
      }
    </pixiContainer>
  )
}
