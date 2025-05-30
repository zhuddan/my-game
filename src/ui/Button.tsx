import type { Graphics } from 'pixi.js'
import { useCallback, useMemo, useState } from 'react'
import { Theme } from '~/constants/config'

export type ButtonProps = PixiContainerProps & {
  radius?: number
  fontSize?: string
  color?: string
  onClick?: () => void
}

const MAX_OFFSET = 10

export const ButtonDefaultProps = {
  width: 400,
  height: 100,
  color: '#fff',
  fontSize: '50',
} as FieldSubset<ButtonProps, 'height' | 'width'>

export default function Button({
  onClick,
  x,
  y,
  children,
  width = ButtonDefaultProps.width,
  height = ButtonDefaultProps.height,
  color = ButtonDefaultProps.color,
  fontSize = ButtonDefaultProps.fontSize,
  radius = 10,
  ...rest
}: ButtonProps) {
  const [isActive, setIsActive] = useState(false)

  // 计算偏移量
  const offset = useMemo(() => {
    return isActive ? MAX_OFFSET / 2 : 0
  }, [isActive])

  // 绘制按钮
  const draw = useCallback((graphics: Graphics) => {
    graphics.clear()

    graphics.roundRect(0 + MAX_OFFSET, 0 + MAX_OFFSET, width, height, radius)
    graphics.setStrokeStyle({ color: Theme.primary, width: 2 })
    graphics.stroke()

    graphics.setFillStyle({
      color: isActive ? Theme.primaryDark : Theme.primary,
    })
    graphics.roundRect(0 + offset, 0 + offset, width, height, radius)
    graphics.fill()
  }, [height, isActive, offset, radius, width])

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
      x={x}
      y={y}
      eventMode="static"
      cursor="pointer"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerUpOutside={handlePointerOut} // 添加这个处理在按钮外释放的情况
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      {...rest}
    >
      <pixiGraphics draw={draw} />
      {
        typeof children === 'string'
          ? (
              <pixiText
                text={children}
                style={{
                  fill: color,
                  fontSize,
                }}
                anchor={0.5}
                x={width / 2 + offset}
                y={height / 2 + offset}
              />
            )
          : (
              <pixiContainer
                x={offset}
                y={offset}
              >
                {children}
              </pixiContainer>
            )
      }
    </pixiContainer>
  )
}
