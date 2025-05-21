import BaseSprite from '~/ui/BaseSprite'
import NavBar from '~/ui/NavBar'

export default function About() {
  return (
    <>
      <NavBar title="关于我们" />
      <BaseSprite texture="Panda" y={300} x={50} />
      <BaseSprite texture="Rabbit" y={500} x={50} />
    </>
  )
}
