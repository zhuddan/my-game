import { useNavigate } from 'react-router-dom'
import Button from '~/components/button'
import { BunnySprite } from '~/layout/BunnySprite'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <pixiContainer
      x={400}
      y={300}
    >
      <pixiText
        text="404"
        style={{
          fill: '#fff',
        }}
        anchor={0.5}
      />
      <Button onClick={() => navigate('/', { replace: true })} x={-90} y={50}>返回首页</Button>
    </pixiContainer>
  )
}
