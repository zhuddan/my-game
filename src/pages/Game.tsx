import { DESIGN } from '~/constants/config'
import GameAction from '~/ui/game/GameAction'
import GameArrow from '~/ui/game/GameArrow'
import GameBar from '~/ui/game/GameBar'
import NavBar from '~/ui/NavBar'

export default function Game() {
  return (
    <>
      <NavBar />
      <GameBar />
      <GameArrow y={DESIGN.HEIGHT - 200} />
      <GameAction />
    </>
  )
}
