import type { Graphics } from 'pixi.js'
import { DESIGN, Theme } from '~/constants/config'

type ProgressBarProps = PixiContainerProps & {
  progress?: number
}

const padding = 4

const PROGRESS_BAR_WIDTH = DESIGN.WIDTH * 0.8

export default function ProgressBar({
  x = (DESIGN.WIDTH - PROGRESS_BAR_WIDTH) / 2,
  y = DESIGN.HEIGHT / 2 + 100,
  progress = 0,
  ...rest
}: ProgressBarProps) {
  // 绘制按钮

  return (
    <pixiContainer x={x} y={y} {...rest}>
      <pixiText
        text={`数据加载中${(progress * 100).toFixed(0)}%`}
        style={{
          align: 'center',
          fill: Theme.primary,
          fontSize: '32',
          stroke: { color: Theme.border, width: 1, join: 'round' },
        }}
        x={PROGRESS_BAR_WIDTH / 2}
        scale={1}
        anchor={{ x: 0.5, y: 0 }}
      >
      </pixiText>
      <pixiGraphics
        draw={(graphics: Graphics) => {
          graphics.clear()
          graphics.setFillStyle({ color: Theme.primaryLight })
          graphics.roundRect(0, 0 + 50, PROGRESS_BAR_WIDTH, 60, 10)
          graphics.fill()
        }}
      />
      <pixiGraphics
        draw={(graphics: Graphics) => {
          graphics.clear()
          graphics.setFillStyle({ color: Theme.primary })
          graphics.roundRect(
            0 + padding,
            0 + padding + 50,
            (PROGRESS_BAR_WIDTH - padding * 2) * progress,
            60 - padding * 2,
            10,
          )
          graphics.fill()
        }}
      />
    </pixiContainer>
  )
}
