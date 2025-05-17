// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { Session, NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt"
import { prisma } from '../../prismaClient';

export const authOptions : NextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",  // または "database"
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Google プロバイダだけに限定する例
      
      
      
      const user_data = await prisma.user.findUnique({
        where: { id: String(user.id) },    // IDが1のユーザーを取得
      });
      
      if (user_data){
        account.profile = user_data.profile
        account.LikeCount = user_data.LikeCount
        return true
      }else{
        
        const newUser = await prisma.user.create({data: {id : String(user.id),email:user.email,image:user.image,name : user.name,profile:"あなたのプロフィール文を入力しましょう",LikeCount:0}});
        account.profile = "あなたのプロフィール文を入力しましょう"
        account.LikeCount = 0
        return true
      }
      
    },
    async jwt({ token,trigger, account,session }) {
    // 最初にサインインされた時にセットする用
    //jwt内だと、session.userじゃないっぽいsession.nameみたいに直で呼び出す。なぜなのかは要調査
    
    if (account) {
      token.accessToken = account.access_token
      token.id = account.providerAccountId
      token.profile = account.profile
      token.LikeCount = account.LikeCount

    }

    if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name
      }
    if (trigger === "update" && session?.profile) {
        token.profile = session.profile
      }
    if (trigger === "update" && session?.LikeCount) {
        token.LikeCount = session.LikeCount
      }

    return token
  },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!session.user || !session.user.name) {
        throw new Error("User information incomplete")
    }
    
    session.user.accessToken = token.accessToken
    session.user.id = token.id 
    session.user.profile = token.profile
    session.user.LikeCount = token.LikeCount
    console.log("session",session)
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


//sessionのprofileの値をリアルタイムで変更することができない。databaseには普通に接続して値を変えることはできるんだけど。