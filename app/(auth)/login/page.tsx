
"use client"

import { useSession, signIn } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function UserMenu() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      // 未認証ならホームに飛ばす
      router.push("/profile/mainProfile")
    }
  }, [status, router])

  if (status === "loading") {
    // 読み込み中
    return <div>Loading...</div>
  }

  if (!session) {
    // 認証済みでない状態（基本的には useEffect でリダイレクトされる）
    return (
      <div>
        <button onClick={() => signIn('credentials', { callbackUrl: '/profile' })}>ログイン</button>
      </div>
    )
  }
  else{
    return (
        <div>
        <p>ログイン済みです</p>
        <p>{session.user?.email}</p>
        </div>
    )
  }
  
}