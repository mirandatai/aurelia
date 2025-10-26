type Props = {
  size?: number
}

export default function Logo({ size = 40 }: Props) {
  return (
    <img
      src="/logo.png"
      width={size}
      height={size}
      alt="Aurélia"
      style={{ height: size, width: 'auto' }}
    />
  )
}
