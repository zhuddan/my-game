import { Theme } from '~/constants/ui'

export default function Title() {
  return (
    <pixiText
      text="做杯奶茶吧abc123"
      style={{
        align: 'center',
        fill: Theme.primary,
        fontSize: '60',
        fontFamily: 'Snippet',
      }}
    >
    </pixiText>
  )
}
