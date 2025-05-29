import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DESIGN } from '~/constants/config'
import Button, { ButtonDefaultProps } from '../Button'
import GameRule from '../game/GameRule'
import Modal from '../Modal'

type BtnTexts = '开始游戏' | '继续游戏' | '关卡选择' | '设置' | '游戏规则' | '关于我们'

export default function HomeActions() {
  const navigate = useNavigate()
  const btns = useMemo(() => {
    return ([
      '开始游戏',
      // '继续游戏',
      // '关卡选择',
      '游戏规则',
      '设置',
      '关于我们',
    ] satisfies BtnTexts[]).map((text, index) => {
      return {
        text,
        y: index * (ButtonDefaultProps.height + 20),
      }
    })
  }, [])
  const [ruleOpen, setRuleOpen] = useState(false)
  const [settingOpen, setSettingOpen] = useState(false)

  const handleClickButton = useCallback((text: BtnTexts) => {
    switch (text) {
      case '开始游戏':
        navigate('./game')
        break
      case '关于我们':
        navigate('./about')
        break
      case '游戏规则':
        setRuleOpen(true)
        break
      case '设置':
        setSettingOpen(true)
        break
      default:
    }
  }, [navigate])

  return (
    <>
      <pixiContainer
        y={500}
        x={(DESIGN.WIDTH - ButtonDefaultProps.width) / 2}
      >
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
      <Modal
        title="游戏规则"
        open={ruleOpen}
        onClose={() => setRuleOpen(false)}
      >
        <GameRule />
      </Modal>
      <Modal
        title="设置"
        open={settingOpen}
        onClose={() => setSettingOpen(false)}
      >
      </Modal>
    </>
  )
}
