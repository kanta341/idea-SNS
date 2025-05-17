import { NextResponse } from 'next/server';
import { prisma } from "@/app/api/prismaClient";

export async function POST(request: Request) {
    try {
    const userCs = await prisma.user.findMany()
    console.log(userCs[0])
    const newPost = await prisma.post.create({
      data: {authorId: userCs[0].id,content:"tt" },

    })

    /*
    const userA = await prisma.user.create({
        data: {
            name: "exampleUserA",
            posts: {
            create: [
                { content: 'ぷりじま0' }, // Populates authorId with user's id
                { content: 'How tori schema' }, // Populates authorId with user's id
            ],
            },

        },
        })
        
    const userB = await prisma.user.create({
        data: {
            name: "exampleUserB",
            posts: {
            create: [
                { content: 'ぷま0' }, // Populates authorId with user's id
                { content: 'How torisma schema' }, // Populates authorId with user's id
            ],
            },

        },
        })
    
    await prisma.follow.create({
    data: {
      followerId: userA.id,    // User A が
      followingId: userB.id,   // User B をフォロー
    },
  });*/
        
        
      return NextResponse.json("d");
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
    } finally {
      await prisma.$disconnect(); // ★ ここで必ずコネクションを閉じる！
    }
  }

