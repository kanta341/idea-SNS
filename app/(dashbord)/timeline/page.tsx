// 任意の client component 例
"use client"



import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react";
import Deletebutton from "@/app/components/deleteButton"
import { Calendar, Link as LinkIcon, MapPin, MessageCircle, Heart, Repeat, Share } from "lucide-react";
import { useRouter } from "next/navigation"

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


export default function Profile() {

  const { data: session, status, update } = useSession()
  const [posts, setPosts] = useState<post[]>([]);
  const router = useRouter()
  // -------- Initial fetch --------
  useEffect(() => {
    const fetchInitialData = async () => {
      try {

        const poses = await fetch("/api/ideas/selectPost");
        if (poses.ok) {
          const { posts } = await poses.json();
          setPosts(posts);
          console.log(posts)
        }

      } catch (err) {
        console.error(err);
      }
    };

    fetchInitialData();
  }, []);

  const clickLike = async (postId: number, isLiked: boolean) => {
    if (!isLiked) {
      try {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, LikeCount: post.LikeCount + 1, isLiked: true } : post
          ));
        const res = await fetch("/api/ideas/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: postId, isLiked: isLiked }),
        });
        if (res.ok) {

        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, LikeCount: post.LikeCount - 1, isLiked: false } : post
          ));
        const res = await fetch("/api/ideas/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: postId, isLiked: isLiked }),
        });
        if (res.ok) {

        }
      } catch (err) {
        console.error(err);
      }
    }
  }
  const SeeSled = async (postId: number) => {
    router.push(`/timeline/${postId}`)
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
    <div className="max-w-screen-md mx-auto ">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-xl text-amber-400 font-bold">ホーム</h1>

      </header>


      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => SeeSled(post.id)} // 👈 クリック時の処理
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className="flex space-x-3">

              <div className="flex-1 min-w-0">
                <div className="flex items-center text-sm">
                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {post.authorName}
                  </p>
                  <p className="ml-1 text-gray-500 dark:text-gray-400 truncate">
                    {post.authorName} · {post.createdAt}
                  </p>
                </div>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  {post.content}
                </p>
                <div className="mt-3 flex justify-between max-w-md">

                  <button className="flex items-center text-gray-500 hover:text-blue-500">
                    <MessageCircle size={18} />
                    <span className="ml-2 text-xs">{post.CommentCount}</span>
                  </button>

                  <button
                      onClick={(e) => {
                        e.stopPropagation(); // 👈 ← ここでバブリングを防止
                        clickLike(post.id, post.isLiked);
                      }}
                    className="flex items-center text-gray-500 hover:text-red-500">
                    <Heart size={18} className={post.isLiked ? "text-red-500" : "text-black"} />
                    <span className="ml-2 text-xs">{post.LikeCount}</span>
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}