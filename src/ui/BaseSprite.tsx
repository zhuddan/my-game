import type { SpriteAssetName } from '~/constants/assets'
import { Texture } from 'pixi.js'
import { useMemo } from 'react'
import { AssetsMap } from './Loading'

export interface BaseSpriteProps extends Omit<PixiSpriteProps, 'texture'> {
  texture: SpriteAssetName
}

export default function BaseSprite(
  {
    texture,
    ...rest
  }: BaseSpriteProps,
) {
  const _texture = useMemo(() => {
    return AssetsMap.get(texture) || Texture.EMPTY
  }, [texture])
  return (
    <pixiSprite texture={_texture} {...rest} />
  )
}
