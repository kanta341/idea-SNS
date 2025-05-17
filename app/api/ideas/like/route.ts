import { NextResponse } from 'next/server';
import { prisma } from "@/app/api/prismaClient";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export async function POST(req: Request) {
    try {//reqにはpostのidを送る
    const body = await req.json();
    const session = await getServerSession(authOptions)
    
    if (body.isLiked){
      await prisma.like.delete({
      where: {
        userId_postId: {
          userId: session?.user.id!,
          postId: body.id,
        },
      },
    });
      
      await prisma.post.update({
        where: {
        id: body.id,
      },
      data: {
        LikeCount: {
          decrement: 1,   // 👈 現在の値に +1
        },
      },
      })
    }else{
      await prisma.like.create({
      data: {
        userId: session?.user.id,    // User A が
        postId: body.id,   // User B をフォロー
      },
      })
      
      await prisma.post.update({
        where: {
        id: body.id,
      },
      data: {
        LikeCount: {
          increment: 1,   // 👈 現在の値に +1
        },
      },
      })
    }


      return NextResponse.json("d");
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
    } finally {
      await prisma.$disconnect(); // ★ ここで必ずコネクションを閉じる！
    }
  }



