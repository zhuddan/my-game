import { useMemo } from 'react'
import Button from '~/components/Button'
import { Theme } from '~/constants/ui'

export default function Index() {
  const btns = useMemo(() => {
    return [
      '开始游戏',
      '继续游戏',
      '关卡选择',
      '设置',
      '关于我们',
    ].map((text, index) => {
      return {
        text,
        y: index * (50 + 20),
      }
    })
  }, [])
  return (
    <pixiContainer x={400} y={60}>
      <pixiText
        text="做杯奶茶吧"
        anchor={{
          x: 0.5,
          y: 0,
        }}
        style={{
          align: 'center',
          fill: Theme.primary,
          fontSize: '60',
          fontWeight: '600',
        }}
      >
      </pixiText>
      <pixiContainer y={110} x={-90}>
        {
          btns.map((it) => {
            return (
              <Button
                key={it.text}
                y={it.y}
              >
                {it.text}
              </Button>
            )
          })
        }
      </pixiContainer>
    </pixiContainer>
  )
}
