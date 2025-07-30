import { prisma } from "@/app/api/prismaClient"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  
  const { id: userId } = await params;
  const { name } = await req.json()
  // Userの名前を更新
  const ff = await prisma.user.update({
    where: { id: userId },
    data: { name: name },
  })

  // PostのauthorNameを更新
  await prisma.post.updateMany({
    where: { authorId: userId },
    data: { authorName: name },
  })
  

  // CommentのauthorNameを更新
  await prisma.comment.updateMany({
    where: { userId: userId },
    data: { authorName: name },
  })

  return NextResponse.json({ success: true })
}