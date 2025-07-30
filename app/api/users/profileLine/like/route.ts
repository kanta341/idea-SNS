import { NextResponse } from 'next/server';
import { prisma } from "@/app/api/prismaClient";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import type { NextRequest } from "next/server"


export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
    try {
    const body = await req.json();
    

    const likeList = await prisma.like.findMany({
    where: { userId: body.id  },
    include: {
        post: true, // ← Like → Post を取得
    },
    });
    

    const likedPosts = likeList.map((like) => like.post);
    console.log(likedPosts)
    return NextResponse.json({likedPosts:likedPosts});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
    } finally {
      await prisma.$disconnect(); // ★ ここで必ずコネクションを閉じる！
    }
  }

