import type { RootState } from '../store'
import { createSlice } from '@reduxjs/toolkit'
import { DESIGN } from '~/constants/config'

export enum GameStatus {
  PLAY = 'PLAY',
  END = 'END',
}
// Define a type for the slice state
export interface GameState {
  gameStatus: GameStatus
  isShotting: boolean
  targetNeedles: number[]
  targetRotation: number
  arrowY: number
}

// Define the initial state using that type
const initialState: GameState = {
  gameStatus: GameStatus.PLAY,
  isShotting: false,
  targetNeedles: [
    0,
  ],
  targetRotation: 0,
  arrowY: DESIGN.HEIGHT - 200 - 5,
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
      state.targetRotation += 0.005
    },
    moveArrow(state) {
      if (state.arrowY <= 500 + 100) {
        state.isShotting = false
        const oneDeg = Math.PI / 180
        console.log(state.targetRotation / oneDeg)
        state.targetNeedles.push(Math.PI - state.targetRotation)
        state.gameStatus = GameStatus.END
      }
      else {
        state.arrowY -= 10
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
