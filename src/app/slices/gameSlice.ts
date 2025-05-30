import type { RootState } from '../store'
import { createSlice } from '@reduxjs/toolkit'
import { DESIGN } from '~/constants/config'

export enum GameStatus {
  PLAY = 'PLAY',
  END = 'END',
}

const oneDeg = Math.PI / 180

const defaultY = DESIGN.HEIGHT - 200 - 5

// Define a type for the slice state
export interface GameState {
  gameStatus: GameStatus
  isShotting: boolean
  targetNeedles: number[]
  targetRotation: number
  arrowY: number
}
const diff = 50 / (305)
// Define the initial state using that type
const initialState: GameState = {
  gameStatus: GameStatus.PLAY,
  isShotting: false,
  targetNeedles: [
    0,
    diff * 2,
  ],
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
      state.targetRotation += 0.005
    },
    moveArrow(state) {
      if (state.arrowY <= 500 + 100) {
        state.isShotting = false
        for (let index = 0; index < state.targetNeedles.length; index++) {
          const element = state.targetNeedles[index]
        }
        state.targetNeedles.push(state.targetRotation)
        // state.gameStatus = GameStatus.END
        state.arrowY = defaultY
      }
      else {
        state.arrowY -= 11 + state.arrowY / 10
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
