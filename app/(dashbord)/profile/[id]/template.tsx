
"use client"



import { useRouter } from "next/navigation"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react";
import Deletebutton from "@/app/components/deleteButton"
import { Calendar, Link as LinkIcon, MapPin, MessageCircle, Heart, Repeat, Share } from "lucide-react";
import Link from 'next/link'
import '@/app/globals.css'
import { useParams } from "next/navigation";

import { usePathname } from "next/navigation";
import { User } from "@prisma/client";
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



export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session,status,update } = useSession()


  const [userData, setUserData] = useState<User>();
  const [posts, setPosts] = useState<post[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [loadingSuggestion, setLoadingSuggestion] = useState<boolean>(false);
  const [finalIdea, setFinalIdea] = useState<string>("");
  const pathname = usePathname(); // 現在のパス（例：/timeline/123）
  const [tab, setTab] = useState<string>("");
  const router = useRouter()

  const params = useParams();
  const userId = params.id;
  // -------- Initial fetch --------
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (pathname == `/profile/${userId}`){
            setTab("main")
        }else if (pathname == `/profile/${userId}/like`){
            setTab("like")
        }else{
            setTab("other")
        }
        const res = await fetch(`/api/user/getUserInfo/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })

        if (res.ok) {
          const userInfo = await res.json();
          console.log(userInfo)
          setUserData(userInfo)
        }

      } catch (err) {
        console.error(err);
      }
    };
    fetchInitialData();
    

  }, []);

  const clickTab = async(tabName:String) => {
    router.push(`${tabName}`)

  }


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
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">プロフィール</h1>
        </div>
      </header>

      <div className="relative">
        {/* カバー画像 */}
        <div className="h-48 bg-blue-100 dark:bg-blue-900">
          
        </div>

        {/* プロフィール情報 */}
        <div className="p-4">
          <div className="flex justify-between">
            
            <Link href="/profile/editProfile" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-sm">
              プロフィール編集
            </Link>
          </div>

          <div className="mt-3">
            <h2 className="text-xl font-bold">{userData?.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{userData?.name}</p>
          </div>

          <p className="mt-3 text-gray-900 dark:text-gray-100">{userData?.profile}</p>

          <div className="mt-3 flex flex-wrap gap-y-2">
            {userProfile.location && (
              <div className="flex items-center text-gray-500 dark:text-gray-400 mr-4">
                <MapPin size={16} />
                <span className="ml-1 text-sm">{userProfile.location}</span>
              </div>
            )}
            {userProfile.website && (
              <div className="flex items-center text-blue-500 mr-4">
                <LinkIcon size={16} />
                <a href={userProfile.website} className="ml-1 text-sm hover:underline">
                  {userProfile.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Calendar size={16} />
              <span className="ml-1 text-sm">{userProfile.joinedDate}に登録</span>
            </div>
          </div>

          <div className="mt-3 flex">
            <div className="mr-4">
              <span className="font-bold">{userData?.LikeCount}</span>{" "}
              <span className="text-gray-500 dark:text-gray-400">フォロー中</span>
            </div>
            <div>
              <span className="font-bold">{userData?.LikeCount}</span>{" "}
              <span className="text-gray-500 dark:text-gray-400">フォロワー</span>
            </div>
          </div>
        </div>
        
                {/* タブナビゲーション */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <button
  className={`flex-1 py-3 border-b-2 font-medium ${tab === "main" ? "border-blue-500 text-blue-500" : "border-transparent text-black dark:text-white"}`}
  onClick={()=>clickTab(`/profile/${userId}`)}
>              投稿
            </button>
            <button
  className={`flex-1 py-3 border-b-2 font-medium ${tab === "like" ? "border-blue-500 text-blue-500" : "border-transparent text-black dark:text-white"}`}
  onClick={()=>clickTab(`/profile/${userId}/like`)}

>              いいね
            </button>
            <button
  className={`flex-1 py-3 border-b-2 font-medium ${tab === "other" ? "border-blue-500 text-blue-500" : "border-transparent text-black dark:text-white"}`}
  onClick={()=>clickTab(`/profile/${userId}/other`)}

>              その他
            </button>∏
            
          </nav>
        </div>

                {children}
      </div>
    </div>
  );
  
}






