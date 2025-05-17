import { NextResponse } from 'next/server';
import { prisma } from "@/app/api/prismaClient";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export async function POST(req: Request) {
    try {
    const body = await req.json();
    const session = await getServerSession(authOptions)
    const userCs = await prisma.user.findMany()
    
    const newPost = await prisma.post.create({
      data: {
        authorId: session?.user.id,
        content:body.content,
        authorName:session?.user.name,
        LikeCount:0,
        CommentCount:0,
      },
    })
    


      return NextResponse.json("d");
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
    } finally {
      await prisma.$disconnect(); // ★ ここで必ずコネクションを閉じる！
    }
  }

