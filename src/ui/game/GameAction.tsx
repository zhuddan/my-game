import { useAppDispatch } from '~/app/hooks'
import { shot } from '~/app/slices/gameSlice'
import { DESIGN } from '~/constants/config'

export default function GameAction() {
  const dispatch = useAppDispatch()
  const diff = 150
  function handleShot() {
    dispatch(shot())
  }
  return (
    <>
      <pixiGraphics
        eventMode="static"
        onPointerDown={handleShot}
        y={diff}
        alpha={0}
        draw={(g) => {
          g.clear()
          g.roundRect(0, 0, DESIGN.WIDTH, DESIGN.HEIGHT - diff)
          g.fill()
        }}
      >
      </pixiGraphics>
    </>
  )
}
