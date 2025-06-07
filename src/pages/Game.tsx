import { useTick } from '@pixi/react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { GameStatus, moveArrow, resetGame, roll, selectArrowY, selectCurrentLevel, selectGameStatus, selectIsShotting, selectLevelConfig } from '~/app/slices/gameSlice'
import { LevelConfigs } from '~/config'
import GameAction from '~/ui/game/GameAction'
import GameArrow from '~/ui/game/GameArrow'
import GameTarget from '~/ui/game/GameTarget'
import GameTip, { GameTipType } from '~/ui/game/GameTip'
import NavBar from '~/ui/NavBar'

export default function Game() {
  const isShotting = useAppSelector(selectIsShotting)
  const arrowY = useAppSelector(selectArrowY)
  const gameStatus = useAppSelector(selectGameStatus)
  const currentLevel = useAppSelector(selectCurrentLevel)
  const levelConfig = useAppSelector(selectLevelConfig)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [showGameTip, setShowGameTip] = useState(false)
  const [gameTipType, setGameTipType] = useState<GameTipType>(GameTipType.LEVEL_SUCCESS)

  const gameLoop = useCallback(() => {
    dispatch(roll())
    if (isShotting) {
      dispatch(moveArrow())
    }
  }, [dispatch, isShotting])

  useTick({
    callback: gameLoop,
    isEnabled: gameStatus === GameStatus.PLAY,
  })

  useEffect(() => {
    if (gameStatus === GameStatus.END) {
      setGameTipType(GameTipType.GAME_OVER)
      setShowGameTip(true)
    }
    else if (gameStatus === GameStatus.SUCCESS) {
      const isLastLevel = currentLevel === LevelConfigs.length - 1
      setGameTipType(isLastLevel ? GameTipType.GAME_COMPLETE : GameTipType.LEVEL_SUCCESS)
      setShowGameTip(true)
    }
  }, [gameStatus, currentLevel])

  const handleGameTipClose = useCallback(() => {
    setShowGameTip(false)
    dispatch(resetGame())
    navigate('/')
  }, [dispatch, navigate])

  return (
    <>
      <NavBar title={`第${currentLevel + 1}关 ${levelConfig.name}`} />
      <GameTarget />
      <GameArrow y={arrowY} />
      <GameAction />
      <GameTip
        open={showGameTip}
        onClose={handleGameTipClose}
        type={gameTipType}
      />
    </>
  )
}
