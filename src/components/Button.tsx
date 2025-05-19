import type { Graphics } from 'pixi.js'
import { type ReactNode, useCallback, useMemo, useState } from 'react'
import { Theme } from '~/constants/ui'

interface ButtonProps {
  x?: number
  y?: number
  width?: number
  height?: number
  radius?: number
  children?: ReactNode
  onClick?: () => void
}
const MAX_OFFSET = 6

export default function Button({
  onClick,
  x,
  y,
  children,
  width = 180,
  height = 50,
  radius = 10,
}: ButtonProps) {
  const [isHovered, setIsHover] = useState(false)

  const offset = useMemo(() => {
    return isHovered ? MAX_OFFSET / 2 : 0
  }, [isHovered])

  const draw = useCallback((graphics: Graphics) => {
    graphics.clear()
    graphics.setFillStyle({ color: Theme.primary })
    graphics.roundRect(0 + offset, 0 + offset, width, height, radius)
    graphics.fill()

    graphics.roundRect(0 + MAX_OFFSET, 0 + MAX_OFFSET, width, height, radius)
    graphics.setStrokeStyle({ color: Theme.primary, width: 1 })
    graphics.stroke()
  }, [height, offset, radius, width])

  return (
    <pixiContainer
      y={y}
      x={x}
      eventMode="static"
      cursor="pointer"
      onClick={onClick}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
    >
      <pixiGraphics
        draw={draw}
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
                x={width / 2 + offset}
                y={height / 2 + offset}
              />
            )
          : children
      }
    </pixiContainer>
  )
}
