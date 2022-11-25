import useSWR from 'swr'
import type { IUser } from './../models/user.model'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function useUser({
  redirectTo = '',
  redirectIfFound = false
} = {}) {
  const { data: user, error, mutate: mutateUser } = useSWR<IUser>('/api/user', fetcher)
  const router = useRouter()

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet

    if (!redirectTo || !user) return

    // If redirectTo is set, redirect if the user was not found.
    // If redirectIfFound is also set, redirect if the user was found

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      router.push(redirectTo)
    }
  }, [user, router, redirectTo, redirectIfFound])

  return {
    user,
    error,
    mutateUser
  }
}
