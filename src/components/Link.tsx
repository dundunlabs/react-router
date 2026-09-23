import { useRouter } from "../contexts/RouterContext"

interface LinkAnchorProps extends React.ComponentProps<'a'> {to: string}
interface LinkButtonProps extends React.ComponentProps<'button'> {to: number}

export default function Link(props: LinkAnchorProps | LinkButtonProps) {
  const router = useRouter()

  if (isLinkButton(props)) {
    const { to, ...rest } = props

    return (
      <button
        {...rest}
        onClick={() => router.go(to)}
      />
    )
  }

  const { to, ...rest } = props

  return (
    <a
      {...rest}
      href={to}
      onClick={e => {
        e.preventDefault()
        router.push(to)
      }}
    />
  )
}

function isLinkButton(props: LinkAnchorProps | LinkButtonProps): props is LinkButtonProps {
  return typeof props.to === 'number'
}