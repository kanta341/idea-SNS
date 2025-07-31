//post取得api（userIdから、そのユーザーのポストを取得)
import { NextResponse } from 'next/server';
import { prisma } from "@/app/api/prismaClient";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import type { NextRequest } from "next/server"

interface Params {
  id: string
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
    try {
    const body = await req.json();
    const userWithPosts = await prisma.user.findUnique({
        where: { id: body.id },
        include: {
            posts: true,
        },
    });
    

        
      return NextResponse.json({posts:userWithPosts});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
    } finally {
      await prisma.$disconnect(); // ★ ここで必ずコネクションを閉じる！
    }
  }

