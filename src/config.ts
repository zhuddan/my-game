export const GameConfig = {
  /**
   * 旋转靶半径
   */
  gameTargetRadius: 100,
  /**
   * 旋转靶 y 坐标
   */
  gameTargeY: 500,
  /**
   * 箭高度
   */
  arrowHeight: 200,
  /**
   * 箭宽度
   */
  arrowWidth: 8,
  /**
   * 箭把半径
   */
  arrowBallRadius: 20,
} as const

export interface LevelConfig {
  /**
   * 关卡名称
   */
  name: string
  /**
   * 箭的移动速度系数 (0-1之间，越小越快)
   */
  arrowSpeedFactor: number
  /**
   * 目标旋转速度系数 (越大越快)
   */
  targetRotationSpeed: number
  /**
   * 关卡描述
   */
  description: string
  /**
   * 成功条件：需要插入的箭的数量
   */
  successNeedles: number
}

export const LevelConfigs: LevelConfig[] = [
  {
    name: '简单',
    arrowSpeedFactor: 0.98,
    targetRotationSpeed: 0.009,
    description: '适合新手，箭速较慢，目标旋转速度适中',
    successNeedles: 5,
  },
  {
    name: '中等',
    arrowSpeedFactor: 0.95,
    targetRotationSpeed: 0.012,
    description: '有一定挑战性，箭速适中，目标旋转速度较快',
    successNeedles: 8,
  },
  {
    name: '困难',
    arrowSpeedFactor: 0.92,
    targetRotationSpeed: 0.015,
    description: '高难度挑战，箭速较快，目标旋转速度最快',
    successNeedles: 12,
  },
] as const
