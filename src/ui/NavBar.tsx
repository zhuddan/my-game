import { useNavigate } from 'react-router-dom'
import Title from '~/ui/Title'
import RoundButton from './RoundButton'
import LeftArrow from './shape/LeftArrow'

export default function NavBar({ title }: { title?: string }) {
  const navigate = useNavigate()
  return (
    <>
      <RoundButton
        onClick={() => navigate(-1)}
        x={15}
        y={15}
      >
        <LeftArrow />
      </RoundButton>
      <Title size="small" title={title} y={25} animate={false} />
    </>
  )
}
