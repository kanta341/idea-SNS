// 任意の client component 例
"use client"



import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react";
import Deletebutton from "@/app/components/deleteButton"
import { Calendar, Link as LinkIcon, MapPin, MessageCircle, Heart, Repeat, Share } from "lucide-react";
import Link from 'next/link'
// プロフィール用のモックデータ
interface post {
  id: Number | null // 👈 追加
  authorId?: string | null
  content?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  authorName?: string | null
  LikeCount?: Number | null
  CommentCount?: Number | null
}
const userProfile = {
  name: "山田太郎",
  username: "@yamada_taro",
  avatar: "/api/placeholder/80/80",
  cover: "/api/placeholder/600/200",
  bio: "Webエンジニア / Next.js, React, TypeScriptが好き / 趣味は読書と旅行 / 東京在住",
  location: "東京, 日本",
  website: "https://example.com",
  joinedDate: "2020年1月",
  following: 120,
  followers: 350,
};

// ユーザーの投稿データ

export default function Profile() {

  const { data: session,status,update } = useSession()


  const [theme, setTheme] = useState<string>("");
  const [posts, setPosts] = useState<post[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [loadingSuggestion, setLoadingSuggestion] = useState<boolean>(false);
  const [finalIdea, setFinalIdea] = useState<string>("");

  // -------- Initial fetch --------
  useEffect(() => {
    const fetchInitialData = async () => {
      try {

        const poses = await fetch("/api/users/profileLine");
        if (poses.ok) {
            
          const { posts } = await poses.json();
          console.log(posts.posts)
          setPosts(posts.posts);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchInitialData();
  }, []);

  if (!session) {
    return (
      <div>
        <button onClick={() => signIn()}>ログイン</button>
        <div>
          <Deletebutton />
        </div>
        
      </div>
    
  )
  }


  return (
    <div className="max-w-screen-md mx-auto">
        未実装



    </div>
  );
}