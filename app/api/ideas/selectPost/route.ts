import { NextResponse } from 'next/server';
import { prisma } from "@/app/api/prismaClient";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export async function GET() {
    try {
    const session = await getServerSession(authOptions)
    const Posts = await prisma.post.findMany();

    //取得したポストの中からユーザーの関心の高そうなポストをピックアップ＆ソートする処理
    const likedPosts = await prisma.like.findMany({
      where: { userId: session?.user.id },
      select: { postId: true },
    });

    const likedPostIds = new Set(likedPosts.map(like => like.postId));

    const result = Posts.map(post => ({
      ...post,
      isLiked: likedPostIds.has(post.id),   // 👈 フラグ付与
    }));

      return NextResponse.json({posts:result});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
    } finally {
      await prisma.$disconnect(); // ★ ここで必ずコネクションを閉じる！
    }
  }

