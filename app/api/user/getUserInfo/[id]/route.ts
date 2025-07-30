
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from '@/app/api/prismaClient';
import { getToken } from "next-auth/jwt" 

interface Params {
  id: string
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;

  const userInfo = await prisma.user.findUnique({
    where: { id: id },
  })
  console.log("これがuserinfo",userInfo)
  return NextResponse.json(userInfo)
}
