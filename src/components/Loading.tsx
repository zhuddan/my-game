import { Assets } from 'pixi.js'
import { useEffect, useRef, useState } from 'react'
import { ASSETS } from '~/constants/assets'
import { Theme } from '~/constants/ui'
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
        src: `${import.meta.env.BASE_URL}/game/${it}?V=${Date.now()}`,
      }
    })
    Assets.add(items)

    Assets.load(items.map(e => e.alias), setProgress).then(() => {
      return sleep(100 * 2000)
    }).then(onFinish)
  }, [onFinish])

  return (
    <>
      {
        progress >= 1
        && (
          <>
            <pixiText
              text="做杯奶茶吧FusionPixel"
              style={{
                align: 'center',
                fill: Theme.primary,
                fontSize: '60',
                fontWeight: '600',
                fontFamily: 'FusionPixel',
              }}
            >
            </pixiText>
            <pixiText
              text="做杯奶茶吧abc123"
              y={150}
              style={{
                align: 'center',
                fill: Theme.primary,
                fontSize: '60',
              }}
            >
            </pixiText>
          </>
        )
      }
    </>
  )
}
