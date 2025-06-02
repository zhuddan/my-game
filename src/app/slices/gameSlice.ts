import type { RootState } from '../store'
import { createSlice } from '@reduxjs/toolkit'
import { GameConfig } from '~/config'
import { DESIGN } from '~/constants/config'

export enum GameStatus {
  PLAY = 'PLAY',
  END = 'END',
}

// const oneDeg = Math.PI / 180

const defaultY = DESIGN.HEIGHT
  - GameConfig.arrowHeight - GameConfig.arrowBallRadius

// Define a type for the slice state
export interface GameState {
  gameStatus: GameStatus
  isShotting: boolean
  targetNeedles: number[]
  targetRotation: number
  arrowY: number
}
const diff = GameConfig.arrowBallRadius * 2 / (GameConfig.gameTargetRadius + GameConfig.arrowHeight)
// Define the initial state using that type
const initialState: GameState = {
  gameStatus: GameStatus.PLAY,
  isShotting: false,
  targetNeedles: [],
  targetRotation: 0,
  arrowY: defaultY,
} satisfies GameState

export const GameSlice = createSlice({
  name: 'Game',
  initialState,
  reducers: {
    playGame(state) {
      state.gameStatus = GameStatus.PLAY
    },
    shot(state) {
      state.isShotting = true
    },
    roll(state) {
      state.targetRotation += 0.009
    },
    moveArrow(state) {
      const minY = GameConfig.gameTargeY + GameConfig.gameTargetRadius
      if (state.arrowY <= minY) {
        state.isShotting = false
        const res = (state.targetRotation + 2 * Math.PI) % (2 * Math.PI)
        for (let index = 0; index < state.targetNeedles.length; index++) {
          const element = state.targetNeedles[index]
          if (res < element + diff && res > element - diff) {
            state.gameStatus = GameStatus.END
            return
          }
        }
        state.targetNeedles.push(res)
        state.arrowY = defaultY
      }
      else {
        const nextArrowY = state.arrowY * 0.98
        state.arrowY = nextArrowY <= minY ? minY : nextArrowY
      }
    },
  },
})

export const {
  roll,
  shot,
  playGame,
  moveArrow,
} = GameSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGameStatus = (state: RootState) => state.game.gameStatus
export const selectIsShotting = (state: RootState) => state.game.isShotting
export const selectTargetNeedles = (state: RootState) => state.game.targetNeedles
export const selectTargetRotation = (state: RootState) => state.game.targetRotation
export const selectArrowY = (state: RootState) => state.game.arrowY
export default GameSlice.reducer
