import { Link, useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import { BunnySprite } from '~/layout/BunnySprite'
import PageWrapper from '../layout/page'

export default function Home() {
  const navigate = useNavigate()
  return (
    <>
      <BunnySprite></BunnySprite>
      <Button onClick={() => navigate('/about_us')} y={400} x={200}>about us</Button>
    </>
  )
}
