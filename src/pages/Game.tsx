import { Assets } from 'pixi.js'
import { useEffect } from 'react'
import Button from '~/components/Button'

export default function Game() {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(Assets)
  })
  return (
    <>
      <Button width={80} height={80} radius={80} x={50}>
      </Button>
    </>
  )
}
