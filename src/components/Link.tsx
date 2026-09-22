import { useRouter } from "../contexts/RouterContext"

interface LinkProps extends React.ComponentProps<'a'> {
  to: string
}

export default function Link({ to, ...props }: LinkProps) {
  const router = useRouter()

  return (
    <a
      {...props}
      href={to}
      onClick={e => {
        e.preventDefault()
        router.push(to)
      }}
    />
  )
}