import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import Title from '~/components/Title'
import { Theme } from '~/constants/config'

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
    <>
      <Title />
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
    </>
  )
}
