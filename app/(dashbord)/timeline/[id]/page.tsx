"use client";
// app/(dashboard)/timeline/[id]/page.tsx
import { Heart, MessageCircle, Repeat, Share } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
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

interface comment {
  id: Number | null
  postId?: string | null
  userId?: string | null
  content?: string | null
  createdAt?: string | null
  authorName?: string | null
}



export default function PostSled() {

  const [commentsClient, setCommentsClient] = useState<comment[]>([]);
  const [postClient, setPostClient] = useState<post>();
  const params = useParams();
  const [NewComment, setNewComment] = useState<String>("")
  const postId = params?.id;
  const { data: session, status, update } = useSession()



  useEffect(() => {

    //postIdを元にそれに対するコメントをデータベースから受け取るリクエスト
    const getComments = async () => {
      try {
        const res = await fetch("/api/ideas/getComment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: postId }),
        })
        if (res.ok) {
          const { post, comments } = await res.json();
          console.log(post, comments)
          setCommentsClient(comments)
          setPostClient(post)
        }

      } catch (err) {
        console.error(err);
      }
    };

    getComments();
  }, []);


  const handleSubmit = async () => {

    setCommentsClient(commentsClient)


    try {
      const res = await fetch("/api/ideas/Comment/postComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ NewComment: NewComment, postId: postId }),
      })
      if (res.ok) {
        const { Comment } = await res.json();

        setCommentsClient(prevComments => [...prevComments, Comment]);

      }
    } catch (err) {
      console.error(err);
    }
  }




  //画面下部にスレッドに対して返信できるポストの場所。
  return (
    <div className="max-w-screen-md mx-auto ">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-xl text-amber-400 font-bold">ホーム</h1>

      </header>

                <div
                
            
            className="p-4 pb-10 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"          >
            <div className="flex space-x-3">

              <div className="flex-1 min-w-0">
                <div className="flex items-center text-sm">
                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {postClient?.authorName}
                  </p>
                  <p className="ml-1 text-gray-500 dark:text-gray-400 truncate">
                    {postClient?.authorName} · {postClient?.createdAt}
                  </p>
                </div>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  {postClient?.content}
                </p>
                <div className="mt-3 flex justify-between max-w-md">
                  <button className="flex items-center text-gray-500 hover:text-blue-500">
                    <MessageCircle size={18} />
                    <span className="ml-2 text-xs">{postClient?.CommentCount}</span>
                  </button>

                  <button
                  
                    className="flex items-center text-gray-500 hover:text-red-500">
                    <Heart size={18} className={postClient?.isLiked ? "text-red-500" : "text-black"} />
                    <span className="ml-2 text-xs">{postClient?.LikeCount}</span>
                  </button>
                  
                </div>
              </div>
            </div>
          </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        
        {commentsClient.map((comment) => (
          <div
            key={comment.id}
            // 👈 クリック時の処理
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className="flex space-x-3">

              <div className="flex-1 min-w-0">
                <div className="flex items-center text-sm">
                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {comment.authorName}
                  </p>
                  <p className="ml-1 text-gray-500 dark:text-gray-400 truncate">
                    {comment.authorName} · {comment.createdAt}
                  </p>
                </div>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  {comment.content}
                </p>
                <div className="mt-3 flex justify-between max-w-md">

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* User input & send */}
      <div className="w-full py-30 flex items-end justify-center mt-8">
        <textarea
          value={NewComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="あなたのアイディアを入力してください..."
          className="flex-1 h-24 max-w-3xl border border-gray-300 rounded-lg p-3 resize-none"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="ml-4 h-12 px-6 rounded-xl border-2 border-orange-400 bg-orange-200 hover:bg-orange-300 transition text-purple-700 font-semibold"
        >
          送信
        </button>
      </div>
    </div>
  );
}