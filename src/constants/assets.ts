/** 所有静态资源 */
export const ASSETS = [
  {
    alias: 'ArrowLeft',
    src: '/arrow-left.svg?v=0.0.12'
  },
  {
    alias: 'Chicken',
    src: '/chicken.svg?v=0.0.12'
  },
  {
    alias: 'Dragon',
    src: '/dragon.svg?v=0.0.12'
  },
  {
    alias: 'Fox',
    src: '/fox.svg?v=0.0.12'
  },
  {
    alias: 'Loading',
    src: '/loading.svg?v=0.0.12'
  },
  {
    alias: 'Monkey',
    src: '/monkey.svg?v=0.0.12'
  },
  {
    alias: 'Ox',
    src: '/ox.svg?v=0.0.12'
  },
  {
    alias: 'Panda',
    src: '/panda.svg?v=0.0.12'
  },
  {
    alias: 'Rabbit',
    src: '/rabbit.svg?v=0.0.12'
  },
  {
    alias: 'Tiger',
    src: '/tiger.svg?v=0.0.12'
  }
] as const

export type SpriteAssetName = typeof ASSETS[number]['alias']