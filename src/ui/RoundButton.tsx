import type { ButtonProps } from './Button'
import Button from './Button'

interface RoundButtonProps extends ButtonProps {}
export default function RoundButton({
  width = 80,
  height = 80,
  radius = 80,
  ...rest
}: RoundButtonProps) {
  return (
    <Button
      width={width}
      height={height}
      radius={radius}
      {...rest}
    />
  )
}
