// app/api/users/[id]/route.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { prisma } from '../../../prismaClient';
import { getToken } from "next-auth/jwt" 

interface Params {
  id: string
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params; 
  const body = await req.json();
  const session = await getServerSession(authOptions)
  

  if (session?.user.id !== id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const post = await prisma.user.update({
    where: { id: id },
    data: { profile: body.name},
  })
  
  return NextResponse.json(post)
}



/*
やりたいこと
・サインインして、sessionとデータベースにプロフィールぶんを保存。それを編集できる機能。
いいねカウントをフロントエンドで手軽に操作→これをsessionとデータベースに保存する。

sessionの良さ（データベースにない点）は、ログイン情報を一度入力してしまえば、その後何度ページをリダイレクトしても、その個人を特定できること。（データベースのみだとそれはできない）
*/



