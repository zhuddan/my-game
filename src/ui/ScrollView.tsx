import type { Viewport } from 'pixi-viewport'
import type { Container, Graphics } from 'pixi.js'
import { useApplication } from '@pixi/react'
import { useEffect, useRef } from 'react'

type ScrollViewBarProps = PixiContainerProps & {
  scrollWidth: number
  scrollHeight: number
}
export default function ScrollView({
  scrollWidth,
  scrollHeight,
  children,
  ...rest
}: ScrollViewBarProps) {
  const { app } = useApplication()
  const viewportRef = useRef<Viewport | null>(null)
  const contentRef = useRef<Container | null>(null)
  const mask = useRef<Graphics>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const content = contentRef.current
    if (viewport && content) {
      viewport
        .drag({
          direction: 'y',
        })
        .clamp({
          left: 0,
          right: scrollWidth,
          top: 0,
          bottom: content.height,
        })
        // .bounce({
        //   sides: 'vertical', // 只在垂直方向回弹
        //   time: 300, // 回弹动画时间 300ms
        //   ease: 'easeOutBounce', // 回弹缓动效果
        //   friction: 0.8, // 回弹摩擦力
        // })
        .decelerate({
          friction: 0.9, // 添加惯性滑动，让滚动更流畅
        })
      // debug
      // const line = viewport.addChild(new Graphics())
      // line.setStrokeStyle({
      //   width: 10,
      //   color: 0xFF0000,
      // })
      // line.rect(0, 0, viewport.worldWidth, viewport.worldHeight)
      // line.stroke()
    }
  }, [scrollWidth])

  return (
    <pixiContainer
      mask={mask.current}
      {...rest}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear()
          g.rect(0, 0, scrollWidth, scrollHeight)
          g.fill()
        }}
        ref={mask}
      />
      <pixiViewport
        {
          ...{
            screenWidth: scrollWidth,
            screenHeight: scrollHeight,
            worldWidth: scrollWidth,
          }
        }
        events={app.renderer.events}
        ref={viewportRef}
      >
        <pixiContainer ref={contentRef}>
          {children}
        </pixiContainer>
      </pixiViewport>
    </pixiContainer>
  )
}
