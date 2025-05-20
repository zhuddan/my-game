import type { Texture, TextureSource } from 'pixi.js'
import type { SpriteAssetName } from '~/constants/assets'
import { Assets } from 'pixi.js'
import { useEffect, useRef, useState } from 'react'
import { ASSETS } from '~/constants/assets'
import { sleep } from '~/utils/sleep'
import ProgressBar from './ProgressBar'
import Title from './Title'

export const AssetsMap = new Map<SpriteAssetName, Texture<TextureSource<any>>>()

export default function Loading({
  onFinish,
}: {
  onFinish: () => void
}) {
  const isLoad = useRef(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (isLoad.current) {
      return
    }
    isLoad.current = true

    const items = ASSETS.map((it) => {
      return {
        ...it,
        src: `${import.meta.env.BASE_URL}/game/${it.src}`,
      }
    })

    Assets.add(items)

    Assets.load(items.map(e => e.alias), setProgress).then((object) => {
      for (const key in object) {
        AssetsMap.set(key as SpriteAssetName, object[key])
      }
      return sleep(100 * 0)
    }).then(onFinish)
  }, [onFinish])

  return (
    <>
      <Title />
      <ProgressBar progress={progress} />
    </>
  )
}
