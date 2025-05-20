import { Assets } from 'pixi.js'
import { useEffect, useRef, useState } from 'react'
import { ASSETS } from '~/constants/assets'
import { sleep } from '~/utils/sleep'
import { toPascalCase } from '~/utils/toPascalCase'
import ProgressBar from './ProgressBar'
import Title from './Title'

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
      return sleep(100 * 1000000)
    }).then(onFinish)
  }, [onFinish])

  return (
    <>
      <Title />
      <ProgressBar progress={progress} />
    </>
  )
}
