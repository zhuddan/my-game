import type { Viewport } from 'pixi-viewport'
import type { Container } from 'pixi.js'
import { useApplication } from '@pixi/react'
import gsap from 'gsap'
import { Graphics, TextStyle } from 'pixi.js'
import { useCallback, useEffect, useRef } from 'react'
import { DESIGN, Theme } from '~/constants/config'
import RoundButton from './RoundButton'
import Cross from './shape/Cross'

interface ModalProps {
  width?: number
  height?: number
  open: boolean
  onClose: () => void
}
const t = `规则，是运行、运作规律所遵循的法则。规则，一般指由群众共同制定、公认或由代表人统一制定并通过的，由群体里的所有成员一起遵守的条例和章程。它存在三种形式：明规则、潜规则、元规则，无论何种规则只要违背善恶的道德必须严惩不贷以维护世间和谐；明规则是有明文规定的规则，存在需要不断完善的局限性；潜规则是无明文规定的规则，约定俗成无局限性，可弥补明规则不足之处；元规则是一种以暴力竞争解决问题的规则，善恶参半，非道德之理的文明之道。
规则的三种形式，受人为因素制约，是人类发展过程中形成与创建。在科学体系里，规律和定理是极为重要的构成部分，本质上，它们是人类对自然界各种规则的解读与归纳。一个因人存在的规则与自然界潜在的法则，都属于规则。`

/**
 * 弹窗动画
 */
function useModalAnimate(
  open: boolean,
  onClose: () => void,
) {
  const containerRef = useRef<Container | null>(null)
  const contentRef = useRef<Container | null>(null)
  const handleOpen = useCallback(() => {
    if (contentRef.current && containerRef.current) {
      gsap.timeline()
        .to(contentRef.current.scale, {
          x: 1,
          y: 1,
          ease: 'power4.inOut',
          duration: 0.3,
        }, 0)
        .to(containerRef.current, {
          alpha: 1,
          ease: 'power4.inOut',
          duration: 0.3,
        }, 0)
    }
  }, [])

  const handleClose = useCallback(() => {
    if (contentRef.current && containerRef.current) {
      gsap.timeline()
        .to(contentRef.current.scale, {
          x: 0,
          y: 0,
          ease: 'power4.out',
          duration: 0.3,
        }, 0)
        .to(containerRef.current, {
          alpha: 0,
          ease: 'power4.inOut',
          duration: 0.3,
        }, 0)
        .then(onClose)
    }
  }, [onClose])

  useEffect(() => {
    if (open) {
      handleOpen()
    }
  }, [handleOpen, open])

  return {
    contentRef,
    containerRef,
    handleClose,
  }
}

export default function Modal({
  width = 75 * 6,
  height = 600,
  open,
  onClose,
}: ModalProps) {
  const borderWidth = 20
  const draw = useCallback((g: Graphics) => {
    g.clear()
    g.setFillStyle({ color: Theme.bg })
    g.setStrokeStyle({
      color: Theme.primaryDark,
      width: borderWidth,
    })

    g.roundRect(
      -width / 2,
      -height / 2,
      width,
      height,
      20,
    )
    g.fill()
    g.stroke()
    const titleWidth = 250
    const titleHeight = 100
    g.roundRect(
      -width / 2 + (width - titleWidth) / 2,
      -height / 2 + (-titleHeight) / 2,
      titleWidth,
      titleHeight,
      20,
    )

    g.setStrokeStyle({
      color: Theme.primaryDark,
      width: 15,
    })

    g.fill()
    g.stroke()
  }, [height, width])

  const scrollWidth = width - borderWidth
  const scrollHeight = height - borderWidth

  const { contentRef, containerRef, handleClose } = useModalAnimate(open, onClose)
  const { app } = useApplication()
  const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    stroke: { color: '#4a1850', width: 5, join: 'round' },
    dropShadow: {
      color: '#000000',
      blur: 4,
      angle: Math.PI / 6,
      distance: 6,
    },
    wordWrap: true,
    wordWrapWidth: scrollWidth,
    whiteSpace: 'pre',
    breakWords: true,
  })

  const viewportRef = useRef<Viewport | null>(null)

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.drag({
        direction: 'y',
      })// .pinch().wheel().decelerate()
        .bounce({
        // sides: 'vertical',
        })

      const line = viewportRef.current.addChild(new Graphics())
      line.setStrokeStyle({
        width: 10,
        color: 0xFF0000,
      })
      line.rect(0, 0, viewportRef.current.worldWidth, viewportRef.current.worldHeight)
      line.stroke()
    }
  }, [])

  return (
    <pixiContainer visible={open} ref={containerRef} alpha={0}>
      <pixiGraphics
        eventMode="static"
        draw={(g) => {
          g.clear()
          g.rect(0, 0, DESIGN.WIDTH, DESIGN.HEIGHT)
          g.setFillStyle({ color: Theme.masBg })
          g.fill()
        }}
      >
      </pixiGraphics>
      <pixiContainer
        scale={0}
        x={DESIGN.WIDTH / 2}
        y={DESIGN.HEIGHT / 2}
        ref={contentRef}
      >
        <pixiGraphics draw={draw} />
        <RoundButton
          onClick={handleClose}
          x={width / 2 - 40}
          y={-height / 2 - 40}
        >
          <Cross />
        </RoundButton>
        <pixiText
          text="设置"
          x={0}
          y={-height / 2}
          anchor={0.5}
          style={{
            align: 'center',
            fill: Theme.primary,
            fontSize: '66',
            fontWeight: '600',
            stroke: { color: '#4a1850', width: 5, join: 'round' },
          }}
        />

        <pixiGraphics
          x={-scrollWidth / 2}
          y={-scrollHeight / 2}
          alpha={0.5}
          draw={(g) => {
            g.clear()
            g.rect(0, 0, scrollWidth, scrollHeight)
            g.fill()
          }}

        />

        <pixiContainer
          x={-scrollWidth / 2}
          y={-scrollHeight / 2}
        >
          <pixiViewport
            worldHeight={scrollHeight}
            worldWidth={scrollWidth}
            events={app.renderer.events}
            ref={viewportRef}
          >
            <pixiText text={t} style={style}></pixiText>
          </pixiViewport>
        </pixiContainer>

      </pixiContainer>
    </pixiContainer>
  )
}
