import { useRouter } from "../contexts/RouterContext"

interface LinkAnchorProps extends React.ComponentProps<'a'> { to: string }
interface LinkButtonProps extends React.ComponentProps<'button'> { to: number }

export default function Link(props: (LinkAnchorProps | LinkButtonProps) & { as?: React.ElementType }) {
  const router = useRouter()

  if (isLinkButton(props)) {
    const { as: Component = 'button', to, ...rest } = props

    return (
      <Component
        {...rest}
        onClick={() => router.go(to)}
      />
    )
  }

  const { as: Component = 'a', to, ...rest } = props

  return (
    <Component
      {...rest}
      href={to}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push(to)
      }}
    />
  )
}

function isLinkButton(props: LinkAnchorProps | LinkButtonProps): props is LinkButtonProps {
  return typeof props.to === 'number'
}