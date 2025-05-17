import { NextResponse } from 'next/server';
import { prisma } from "@/app/api/prismaClient";

export async function GET() {
    try {
      const allLike = await prisma.like.findMany()
  for (const i of allLike){
          const deletPost = await prisma.like.delete({where: {id: i.id}});
        }
      const allComment = await prisma.comment.findMany()
  for (const i of allComment){
          const deletPost = await prisma.comment.delete({where: {id: i.id}});
        }
    const allPost = await prisma.post.findMany()
  for (const i of allPost){
          const deletPost = await prisma.post.delete({where: {id: i.id}});
        }
    const allFollow = await prisma.follow.findMany()
  for (const i of allFollow){
          const deletFollow = await prisma.follow.delete({where: {id: i.id}});
        }
    const allUser = await prisma.user.findMany()
    for (const i of allUser){
        const deletedTodo = await prisma.user.delete({where: {id: i.id}});
      }
      console.log("OK")
      return NextResponse.json("s");
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
    } finally {
      await prisma.$disconnect(); // ★ ここで必ずコネクションを閉じる！
    }
  }

