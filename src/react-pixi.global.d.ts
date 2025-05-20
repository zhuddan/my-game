// react-pixi.global.d.ts
// 由于 @pixi/react 未开放具体子目录的导出, 目前只能从 node_modules 导入
import type { PixiReactElementProps } from '@pixi/react'
import type { NameOverrides } from 'node_modules/@pixi/react/types/constants/NameOverrides'
import type { PixiComponents } from 'node_modules/@pixi/react/types/typedefs/PixiComponents'
import type * as PIXI from 'pixi.js'

type PixiComponentsProps = {
  [K in PixiComponents as `${K extends keyof typeof NameOverrides
    ? typeof NameOverrides[K]
    : K}`]: PixiReactElementProps<(typeof PIXI)[K]>
}

declare global {
  type PixiTextProps = PixiComponentsProps['Text']
  type PixiGraphicsProps = PixiComponentsProps['Graphics']
  type PixiContainerProps = PixiComponentsProps['Container']
  type PixiSpriteProps = PixiComponentsProps['Sprite']
}
// 或者更好 更简单
// declare global {
//   type PixiTextProps = PixiReactElementProps<typeof import('pixi.js')['Text']>
// }
export {}
