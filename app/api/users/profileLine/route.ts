import { NextResponse } from 'next/server';
import { prisma } from "@/app/api/prismaClient";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export async function GET() {
    try {
    const session = await getServerSession(authOptions)
    const userWithPosts = await prisma.user.findUnique({
        where: { id: session?.user.id },
        include: {
            posts: true,   // 👈 関連Postを取得
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

