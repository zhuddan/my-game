import { Assets } from 'pixi.js'
import { useEffect, useRef, useState } from 'react'
import { ASSETS } from '~/constants/assets'
import { sleep } from '~/utils/sleep'
import { toPascalCase } from '~/utils/toPascalCase'

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
      const name = it.split('.')[0]
      return {
        alias: toPascalCase(name),
        src: `${import.meta.env.BASE_URL}/assets/${it}?V=${Date.now()}`,
      }
    })
    Assets.add(items)
    const texturesPromise = Assets.load(
      items.map(e => e.alias),
      setProgress,
    )
    texturesPromise.then(() => {
      return sleep(1000)
    }).then(onFinish)
  }, [onFinish])
  return (
    <>
      <pixiText
        text={`LOADING/${progress}`}
        style={{
          fill: '#fff',
        }}
      >
      </pixiText>
    </>
  )
}
