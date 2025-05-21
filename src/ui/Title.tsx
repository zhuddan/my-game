import type { Text } from 'pixi.js'
import gsap from 'gsap'

import { useEffect, useRef } from 'react'
import { DESIGN, Theme } from '~/constants/config'

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
  const textRef = useRef<Text | null>(null)

  useEffect(() => {
    if (textRef.current && animate) {
      gsap.fromTo(
        textRef.current,
        { x: 0.92, y: 0.92 },
        { x: 1, y: 1, repeat: -1, yoyo: true },
      )
    }
  }, [animate])

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
