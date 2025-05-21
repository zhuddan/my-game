import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { DESIGN } from '~/constants/config'
import Button, { ButtonDefaultProps } from './Button'

type BtnTexts = '开始游戏' | '继续游戏' | '关卡选择' | '设置' | '关于我们'

export default function HomeActions() {
  const navigate = useNavigate()
  const btns = useMemo(() => {
    return ([
      '开始游戏',
      // '继续游戏',
      '关卡选择',
      '设置',
      '关于我们',
    ] satisfies BtnTexts[]).map((text, index) => {
      return {
        text,
        y: index * (ButtonDefaultProps.height + 20),
      }
    })
  }, [])

  const handleClickButton = useCallback((text: BtnTexts) => {
    switch (text) {
      case '开始游戏':
        navigate('./game')
        // alert(text)
        break
      case '关于我们':
        navigate('./about')
        // alert(text)
        break
      default:
    }
  }, [navigate])
  return (
    <pixiContainer y={500} x={(DESIGN.WIDTH - ButtonDefaultProps.width) / 2}>
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
  )
}
