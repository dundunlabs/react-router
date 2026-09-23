import { useEffect } from "react"
import { useRouter } from "../contexts/RouterContext"

interface RedirectProps {
  to: string
  replace?: boolean
}

export default function Redirect({ to, replace }: RedirectProps) {
  const router = useRouter()

  useEffect(() => {
    const redirect = replace ? router.replace : router.push
    redirect(to)
  }, [router, to, replace])

  return null
}