import type { Text as PixiTextClass } from 'pixi.js'
import gsap from 'gsap'

import { useCallback } from 'react'
import { DESIGN, Theme } from '~/constants/config'
import { useInstanceRef } from '~/hooks/useInstanceRef'

interface TitleProps extends PixiTextProps {
  size?: 'default' | 'small'
  animate?: boolean
  title?: string
}
export default function Title({
  size = 'default',
  animate = true,
  title = '做杯奶茶吧',
  x = DESIGN.WIDTH / 2,
  y = 150,
  ...rest
}: TitleProps) {
  const update = useCallback((ins: PixiTextClass) => {
    gsap.fromTo(
      ins.scale,
      {
        x: 0.92,
        y: 0.92,
      },
      {
        x: 1,
        y: 1,
        // duration: 1.5,
        repeat: -1,
        yoyo: true,
        // ease: 'bounce.out',
      },
    )
  }, [])
  const textRef = useInstanceRef(animate ? update : undefined)

  return (
    <pixiText
      ref={textRef}
      text={title}
      style={{
        align: 'center',
        fill: Theme.primary,
        fontSize: size === 'default' ? '90' : '60',
        fontWeight: '600',
        stroke: { color: '#4a1850', width: 5, join: 'round' },
        dropShadow: {
          color: '#000000',
          blur: 4,
          angle: Math.PI / 6,
          distance: 6,
        },
      }}
      x={x}
      y={y}
      scale={1}
      anchor={{ x: 0.5, y: 0 }}
      {
        ...rest
      }
    >
    </pixiText>
  )
}
