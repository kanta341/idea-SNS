"use client"

import { profile } from "console"
import { useSession, signIn } from "next-auth/react"
import { useState } from "react"

export default function EditProfileSNS() {
  const { data: session,status,update } = useSession()
  const [newName, setNewName] = useState<string>(session?.user?.name || "")
  const [profileSentence, setProfile] = useState<string>(session?.user?.profile || "")

  const replaceName = async () => {
    try {
      const res = await fetch(`/api/user/renewName/${session?.user?.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      })
      if (res.ok) {
        update({name: newName })
        console.log("OK")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const changeProfile = async () => {
    try {
      const res = await fetch(`/api/user/renewProfile/${session?.user?.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profileSentence }),
      })
      if (res.ok) {
        update({profile: profileSentence })
        // Optional: show toast
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-gray-600">ログインしてください</p>
        <button
          onClick={() => signIn()}
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          ログイン
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      「未完成」
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt="avatar"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-2xl text-gray-400">👤</span>
          )}
        </div>
        <button
          className="mt-2 text-sm text-blue-500 hover:underline"
          onClick={() => {/* 画像アップロード処理など */}}
        >
          アバター変更
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">ユーザー名</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">自己紹介</label>
          <textarea
            value={profileSentence}
            onChange={(e) => setProfile(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            placeholder="何を投稿している人か紹介してください"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => { replaceName(); changeProfile() }}
            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  )
}
