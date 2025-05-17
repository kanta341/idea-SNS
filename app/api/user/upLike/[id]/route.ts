// app/api/users/[id]/route.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { prisma } from '../../../prismaClient';

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
    data: { LikeCount: body.count},
  })
  
  return NextResponse.json(post)
}
