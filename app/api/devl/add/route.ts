
import { NextResponse } from 'next/server';
import { prisma } from "@/app/api/prismaClient";

export async function GET() {
    const fTodo = await prisma.user.findMany()
    const newUser = await prisma.user.create({data: {id : 100,name : "d"}});
    console.log(fTodo)
      return NextResponse.json("s");
  }

