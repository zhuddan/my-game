import { DESIGN, Theme } from '~/constants/config'

interface TitleProps extends PixiTextProps {}
export default function Title({
  x = DESIGN.WIDTH / 2,
  y = 50,
  ...rest
}: TitleProps) {
  return (
    <pixiText
      text="做杯奶茶吧"
      style={{
        align: 'center',
        fill: Theme.primary,
        fontSize: '90',
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
      anchor={{ x: 0.5, y: 0 }}
      {
        ...rest
      }
    >
    </pixiText>
  )
}
