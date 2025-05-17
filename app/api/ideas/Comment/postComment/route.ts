import { NextResponse } from 'next/server';
import { prisma } from "@/app/api/prismaClient";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export async function POST(req: Request) {
  try {//reqにはpostのidを送る
    const body = await req.json();
    const session = await getServerSession(authOptions)

    const Comment = await prisma.comment.create({
      data: {
        userId: session?.user.id,
        postId: Number(body.postId),
        content: body.NewComment,
        authorName:session?.user.name

      }
    })
    const postUpdated = await prisma.post.update({
      where:{
        id:Number(body.postId),
      },
      data:{
        CommentCount: {
          increment: 1,   // 👈 現在の値に +1
        },
      }
    })


    return NextResponse.json({ Comment: Comment });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // ★ ここで必ずコネクションを閉じる！
  }
}



