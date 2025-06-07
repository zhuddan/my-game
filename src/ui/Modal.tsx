import type { Container, Graphics } from 'pixi.js'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { useCallback, useEffect, useRef } from 'react'
import { DESIGN, Theme } from '~/constants/config'
import RoundButton from './RoundButton'
import Cross from './shape/Cross'

export interface ModalProps {
  title: string
  width?: number
  height?: number
  children?: ReactNode
  open: boolean
  onClose: () => void
}

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

const borderWidth = 20
export default function Modal({
  width = 450, // 75 * 6
  height = 600,
  title,
  open,
  onClose,
  children,
}: ModalProps) {
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

  const { contentRef, containerRef, handleClose } = useModalAnimate(open, onClose)
  return (
    <pixiContainer visible={open} ref={containerRef} alpha={0}>
      <pixiGraphics
        eventMode="static"
        draw={
          (g) => {
            g.clear()
            g.rect(0, 0, DESIGN.WIDTH, DESIGN.HEIGHT)
            g.setFillStyle({ color: Theme.masBg })
            g.fill()
          }
        }
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
          text={title}
          y={-height / 2}
          anchor={0.5}
          style={{
            align: 'center',
            fill: Theme.primary,
            fontSize: title.length === 2
              ? '66'
              : '50',
            fontWeight: '600',
            stroke: {
              color: '#4a1850',
              width: 5,
              join: 'round',
            },
          }}
        />
        {children}
      </pixiContainer>
    </pixiContainer>
  )
}
