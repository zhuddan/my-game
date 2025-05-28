import { TextStyle } from 'pixi.js'
import { useErrorBoundary } from 'react-error-boundary'
import { DESIGN, Theme } from '~/constants/config'
import Button from '../Button'

export function ErrorFallback({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary()
  const [width, height] = [500, 500] as const
  return (
    <pixiContainer
      x={DESIGN.WIDTH / 2}
      y={DESIGN.HEIGHT / 2}
    >
      <pixiGraphics
        x={-width / 2}
        y={-height / 2}
        draw={(g) => {
          g.clear()
          g.roundRect(0, 0, width, height)
          g.setFillStyle({
            color: Theme.primaryDark,
          })
          g.setStrokeStyle({
            color: Theme.border,
            width: 20,
          })
          g.fill()
          g.stroke()
        }}
      >

        <pixiText
          x={20}
          y={20}
          text={error.message}
          style={new TextStyle({
            fontFamily: '黑体',
            wordWrap: true,
            wordWrapWidth: width - 20,
          })}
        >
        </pixiText>
      </pixiGraphics>
      <Button onClick={resetBoundary} y={height / 2 + 20} x={-200}>reset</Button>
    </pixiContainer>
  )
}
