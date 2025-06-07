import { Theme } from '~/constants/config'
import Button from '../Button'
import Modal from '../Modal'

interface GameOverProps {
  open: boolean
  onClose: () => void
}
export default function GameOver({
  open,
  onClose,
}: GameOverProps) {
  return (
    <Modal
      onClose={onClose}
      open={open}
      title="游戏结束"
      height={400}
    >
      <pixiText
        text="Game Over"
        y={-50}
        anchor={0.5}
        style={{
          fontFamily: 'Arial',
          fontWeight: 'bold',
          fontSize: 50,
          fill: Theme.primary,
          stroke: {
            color: '#000000',
            width: 4,
            join: 'round',
          },
        }}
      />
      <Button
        y={50}
        width={300}
        x={-150}
        onClick={onClose}
      >
        确定
      </Button>
    </Modal>
  )
}
