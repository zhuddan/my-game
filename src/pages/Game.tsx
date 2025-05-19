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
      <Button width={40} height={40} radius={40}>
      </Button>
    </>
  )
}
