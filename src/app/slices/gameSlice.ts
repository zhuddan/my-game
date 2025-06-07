import type { RootState } from '../store'
import type { LevelConfig } from '~/config'
import { createSlice } from '@reduxjs/toolkit'
import { GameConfig, LevelConfigs } from '~/config'
import { DESIGN } from '~/constants/config'

export enum GameStatus {
  PLAY = 'PLAY',
  END = 'END',
  SUCCESS = 'SUCCESS',
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
  currentLevel: number
  levelConfig: LevelConfig
}
const diff = GameConfig.arrowBallRadius * 2 / (GameConfig.gameTargetRadius + GameConfig.arrowHeight)
// Define the initial state using that type
const initialState: GameState = {
  gameStatus: GameStatus.PLAY,
  isShotting: false,
  targetNeedles: [],
  targetRotation: 0,
  arrowY: defaultY,
  currentLevel: 0,
  levelConfig: LevelConfigs[0],
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
      state.targetRotation += state.levelConfig.targetRotationSpeed
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
        // 检查是否达到成功条件
        if (state.targetNeedles.length >= state.levelConfig.successNeedles) {
          state.gameStatus = GameStatus.SUCCESS
          return
        }
        state.arrowY = defaultY
      }
      else {
        const nextArrowY = state.arrowY * state.levelConfig.arrowSpeedFactor
        state.arrowY = nextArrowY <= minY ? minY : nextArrowY
      }
    },
    resetGame(state) {
      state.gameStatus = GameStatus.PLAY
      state.isShotting = false
      state.targetNeedles = []
      state.targetRotation = 0
      state.arrowY = defaultY
    },
    setLevel(state, action: { payload: number }) {
      const levelIndex = Math.min(Math.max(0, action.payload), LevelConfigs.length - 1)
      state.currentLevel = levelIndex
      state.levelConfig = LevelConfigs[levelIndex]
    },
    nextLevel(state) {
      const nextLevel = Math.min(state.currentLevel + 1, LevelConfigs.length - 1)
      state.currentLevel = nextLevel
      state.levelConfig = LevelConfigs[nextLevel]
    },
  },
})

export const {
  roll,
  shot,
  playGame,
  moveArrow,
  resetGame,
  setLevel,
  nextLevel,
} = GameSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGameStatus = (state: RootState) => state.game.gameStatus
export const selectIsShotting = (state: RootState) => state.game.isShotting
export const selectTargetNeedles = (state: RootState) => state.game.targetNeedles
export const selectTargetRotation = (state: RootState) => state.game.targetRotation
export const selectArrowY = (state: RootState) => state.game.arrowY
export const selectCurrentLevel = (state: RootState) => state.game.currentLevel
export const selectLevelConfig = (state: RootState) => state.game.levelConfig
export default GameSlice.reducer
