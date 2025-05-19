import {
  Application,
  extend,
} from '@pixi/react'

import {
  Container,
  Graphics,
  Sprite,
  Text,
} from 'pixi.js'
import { type ReactNode, useState } from 'react'
import Loading from '~/pages/Loading'

extend({
  Container,
  Graphics,
  Sprite,
  Text,
})

const dpr = window.devicePixelRatio || 1

export default function Layout({ children }: { children?: ReactNode }) {
  const [isLoad, setIsLoad] = useState(false)
  return (
    <Application
      resolution={dpr}
      autoDensity
    >
      {
        isLoad ? children : <Loading onFinish={()=>setIsLoad(true)}/>
      }
    </Application>
  )
}
