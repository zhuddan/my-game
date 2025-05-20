import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import { Theme } from '~/constants/ui'

type BtnTexts = '开始游戏' | '继续游戏' | '关卡选择' | '设置' | '关于我们'

export default function Index() {
  const navigate = useNavigate()
  const btns = useMemo(() => {
    return ([
      '开始游戏',
      '继续游戏',
      '关卡选择',
      '设置',
      '关于我们',
    ] satisfies BtnTexts[]).map((text, index) => {
      return {
        text,
        y: index * (50 + 20),
      }
    })
  }, [])

  const handleClickButton = useCallback((text: BtnTexts) => {
    switch (text) {
      case '开始游戏':
        navigate('./game')
        break
      default:
    }
  }, [navigate])
  return (
    <pixiContainer x={400} y={60}>
      <pixiText
        text="做杯奶茶吧FusionPixel"
        anchor={{
          x: 0.5,
          y: 0,
        }}
        style={{
          align: 'center',
          fill: Theme.primary,
          fontSize: '60',
          fontWeight: '600',
          fontFamily: 'FusionPixel',
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
                onClick={() => handleClickButton(it.text)}
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
