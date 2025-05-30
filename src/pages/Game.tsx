import { useTick } from '@pixi/react'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { GameStatus, moveArrow, roll, selectArrowY, selectGameStatus, selectIsShotting } from '~/app/slices/gameSlice'
import GameAction from '~/ui/game/GameAction'
import GameArrow from '~/ui/game/GameArrow'
import GameTarget from '~/ui/game/GameTarget'
import NavBar from '~/ui/NavBar'

export default function Game() {
  const isShotting = useAppSelector(selectIsShotting)
  const arrowY = useAppSelector(selectArrowY)
  const gameStatus = useAppSelector(selectGameStatus)
  const dispatch = useAppDispatch()
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

  return (
    <>
      <NavBar />
      <GameTarget />
      <GameArrow y={arrowY} />
      <GameAction />
    </>
  )
}
