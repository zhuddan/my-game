import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { nextLevel, resetGame, selectCurrentLevel, selectLevelConfig } from '~/app/slices/gameSlice'
import { LevelConfigs } from '~/config'
import Button from '../Button'
import Modal from '../Modal'

// eslint-disable-next-line react-refresh/only-export-components
export enum GameTipType {
  LEVEL_SUCCESS = 'LEVEL_SUCCESS',
  GAME_OVER = 'GAME_OVER',
  GAME_COMPLETE = 'GAME_COMPLETE',
}

interface GameTipProps {
  open: boolean
  onClose: () => void
  type: GameTipType
}

export default function GameTip({
  open,
  onClose,
  type,
}: GameTipProps) {
  const dispatch = useAppDispatch()
  const currentLevel = useAppSelector(selectCurrentLevel)
  const levelConfig = useAppSelector(selectLevelConfig)
  const isLastLevel = currentLevel === LevelConfigs.length - 1

  const handleNextLevel = () => {
    if (!isLastLevel) {
      dispatch(nextLevel())
      dispatch(resetGame())
    }
    onClose()
  }

  const handleRestart = () => {
    dispatch(resetGame())
    onClose()
  }

  const getTitle = () => {
    switch (type) {
      case GameTipType.LEVEL_SUCCESS:
        return '恭喜通关'
      case GameTipType.GAME_OVER:
        return '游戏失败'
      case GameTipType.GAME_COMPLETE:
        return '恭喜通关'
      default:
        return ''
    }
  }

  const getContent = () => {
    switch (type) {
      case GameTipType.LEVEL_SUCCESS:
        return `第${currentLevel + 1}关 ${levelConfig.name}`
      case GameTipType.GAME_OVER:
        return '很遗憾，游戏失败了'
      case GameTipType.GAME_COMPLETE:
        return '恭喜你完成了所有关卡！'
      default:
        return ''
    }
  }

  const getDescription = () => {
    switch (type) {
      case GameTipType.LEVEL_SUCCESS:
        return levelConfig.description
      case GameTipType.GAME_OVER:
        return '不要灰心，再试一次吧！'
      case GameTipType.GAME_COMPLETE:
        return '你真是太棒了！'
      default:
        return ''
    }
  }

  const renderButtons = () => {
    const buttonWidth = 180
    const buttonHeight = 60
    const buttonGap = 40
    const totalWidth = buttonWidth * 2 + buttonGap
    const startX = -totalWidth / 2

    switch (type) {
      case GameTipType.LEVEL_SUCCESS:
        return (
          <>
            <Button
              y={50}
              x={startX}
              width={buttonWidth}
              height={buttonHeight}
              onClick={onClose}
            >
              返回
            </Button>
            {!isLastLevel && (
              <Button
                y={50}
                x={startX + buttonWidth + buttonGap}
                width={buttonWidth}
                height={buttonHeight}
                onClick={handleNextLevel}
              >
                下一关
              </Button>
            )}
          </>
        )
      case GameTipType.GAME_OVER:
      case GameTipType.GAME_COMPLETE:
        return (
          <>
            <Button
              y={50}
              x={startX}
              width={buttonWidth}
              height={buttonHeight}
              onClick={onClose}
            >
              返回
            </Button>
            <Button
              y={50}
              x={startX + buttonWidth + buttonGap}
              width={buttonWidth}
              height={buttonHeight}
              onClick={handleRestart}
            >
              重新开始
            </Button>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Modal
      onClose={onClose}
      open={open}
      title={getTitle()}
    >
      <pixiText
        text={getContent()}
        y={-100}
        anchor={0.5}
        style={{
          fontFamily: 'Arial',
          fontWeight: 'bold',
          fontSize: 40,
          fill: type === GameTipType.GAME_OVER ? '#ff0000' : '#00ff00',
          stroke: {
            color: '#000000',
            width: 4,
            join: 'round',
          },
        }}
      />
      <pixiText
        text={getDescription()}
        y={-20}
        anchor={0.5}
        style={{
          fontFamily: 'Arial',
          fontSize: 24,
          fill: '#ffffff',
          align: 'center',
        }}
      />
      {renderButtons()}
    </Modal>
  )
}
