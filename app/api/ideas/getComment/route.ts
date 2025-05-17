import { NextResponse } from 'next/server';
import { prisma } from "@/app/api/prismaClient";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export async function POST(req: Request) {
    try {//reqにはpostのidを送る
    const body = await req.json();
    const session = await getServerSession(authOptions)
    
    const Comments = await prisma.comment.findMany({
        where:{
            postId : Number(body.id)
        }
    })
    const post = await prisma.post.findUnique({
        where:{
            id:Number(body.id)
        }
    })


      return NextResponse.json({post:post,comments:Comments});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
    } finally {
      await prisma.$disconnect(); // ★ ここで必ずコネクションを閉じる！
    }
  }



