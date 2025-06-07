import { useTick } from '@pixi/react'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { GameStatus, moveArrow, roll, selectArrowY, selectGameStatus, selectIsShotting } from '~/app/slices/gameSlice'
import GameAction from '~/ui/game/GameAction'
import GameArrow from '~/ui/game/GameArrow'
import GameOver from '~/ui/game/GameOver'
import GameTarget from '~/ui/game/GameTarget'
import NavBar from '~/ui/NavBar'

export default function Game() {
  const isShotting = useAppSelector(selectIsShotting)
  const arrowY = useAppSelector(selectArrowY)
  const gameStatus = useAppSelector(selectGameStatus)
  const dispatch = useAppDispatch()
  const [showGameOver, setShowGameOver] = useState(false)

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
      setShowGameOver(true)
    }
  }, [gameStatus])

  return (
    <>
      <NavBar />
      <GameTarget />
      <GameArrow y={arrowY} />
      <GameAction />
      <GameOver
        open={showGameOver}
        onClose={() => setShowGameOver(false)}
      />
    </>
  )
}
