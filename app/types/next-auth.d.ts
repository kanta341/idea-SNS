// types/next-auth.d.ts
import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string // 👈 追加
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string // 👈 追加
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string // 👈 追加
  }
}