import type { Graphics } from 'pixi.js'
import { type ReactNode, useCallback, useMemo, useState } from 'react'
import { Theme } from '~/constants/config'

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
  const [isActive, setIsActive] = useState(false)

  // 计算偏移量
  const offset = useMemo(() => {
    return isActive ? MAX_OFFSET / 2 : 0
  }, [isActive])

  // 绘制按钮
  const draw = useCallback((graphics: Graphics) => {
    graphics.clear()
    graphics.setFillStyle({ color: Theme.primary })
    graphics.roundRect(0 + offset, 0 + offset, width, height, radius)
    graphics.fill()

    graphics.roundRect(0 + MAX_OFFSET, 0 + MAX_OFFSET, width, height, radius)
    graphics.setStrokeStyle({ color: Theme.primary, width: 1 })
    graphics.stroke()
  }, [height, offset, radius, width])

  // 统一的点击/触摸处理逻辑
  const handlePointerDown = useCallback(() => {
    setIsActive(true)
    // 这里故意不调用onClick，因为我们想在pointerup时触发
  }, [])

  const handlePointerUp = useCallback(() => {
    if (isActive && onClick) {
      // 如果按钮处于激活状态，则调用onClick回调
      onClick()
    }
    setIsActive(false)
  }, [isActive, onClick])

  const handlePointerOut = useCallback(() => {
    setIsActive(false)
  }, [])

  const handlePointerOver = useCallback(() => {
    // 检测是否可能是鼠标设备
    if (!('ontouchstart' in window)) {
      setIsActive(true)
    }
  }, [])

  return (
    <pixiContainer
      y={y}
      x={x}
      eventMode="static"
      cursor="pointer"
      // 移除onClick，完全依赖pointer事件
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerUpOutside={handlePointerOut} // 添加这个处理在按钮外释放的情况
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      hitArea={{
        contains: (x: number, y: number) => {
          return x >= 0 && x <= width && y >= 0 && y <= height
        },
      }}
    >
      <pixiGraphics draw={draw} />
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
