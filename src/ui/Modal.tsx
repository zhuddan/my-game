import type { Container, Graphics } from 'pixi.js'
import gsap from 'gsap'
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

export default function Modal({
  width = 500,
  height = 600,
  open,
  onClose,
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
    g.setFillStyle({ color: Theme.bg })
    g.fill()
    g.setStrokeStyle({
      color: Theme.primary,
      width: borderWidth,
    })
    g.stroke()
  }, [height, width])

  const tween = useRef<gsap.core.Tween | null>(null)
  const containerRef = useRef<Container | null>(null)

  const handleOpen = useCallback(() => {
    if (containerRef.current) {
      tween.current = gsap.fromTo(
        containerRef.current.scale,
        { x: 0, y: 0 },
        { x: 1, y: 1, ease: 'power4.inOut', duration: 0.3 },
      )
    }
  }, [])

  const handleClose = useCallback(() => {
    tween.current?.reverse().then(onClose)
  }, [onClose])

  useEffect(() => {
    if (open) {
      handleOpen()
    }
  }, [handleOpen, open])

  return (
    <pixiContainer visible={open}>
      <pixiGraphics
        eventMode="static"
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
      <pixiContainer
        scale={1}
        x={DESIGN.WIDTH / 2}
        y={DESIGN.HEIGHT / 2}
        ref={containerRef}
      >
        <pixiGraphics draw={draw} />
        <RoundButton
          onClick={handleClose}
          x={width / 2 - 40}
          y={-height / 2 - 40}
        >
          <Cross />
        </RoundButton>
      </pixiContainer>
    </pixiContainer>
  )
}
