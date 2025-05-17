// 任意の client component 例
"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react";
import Deletebutton from "../components/deleteButton"
import { count } from "console";

export default function UserMenu() {
  const [newName, setNewName] = useState<string>("");
  const { data: session,status,update } = useSession()
  const [profileSentence, setProfile] = useState<string>("");
  




  const replaceName = async (name: String) => {
    try {
      const res = await fetch(`/api/user/renewName/${session?.user.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name}),       // 👈 これが必須
      });
      update({name: name })
      if (!res.ok) {
        throw new Error("サーバーエラー: " + res.status);
      }
      
  
    } catch (error) {
      console.error("エラー:", error);
    }
  };

    const replaceName2 = async (name: String) => {
    try {
      const res = await fetch(`/api/devl/sample`, {
      method: "POST",
      credentials: "include",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name}),       // 👈 これが必須
      });
      if (!res.ok) {
        throw new Error("サーバーエラー: " + res.status);
      }
      
  
    } catch (error) {
      console.error("エラー:", error);
    }
  };
  
  const changeProfile = async (name: String) => {
      try {
      const res = await fetch(`/api/user/renewProfile/${session?.user.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name}),
      });
      update({ profile: name })
      if (!res.ok) {
        throw new Error("Failed to renew profile");
      }
    } catch (error) {
      console.error("エラー:", error);
    }
    } 

    
  const deleting = async () => {

    try {
      const res = await fetch("/api/devl/deleteData", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to add todo");
      }
    } catch (error) {
      console.error("エラー:", error);
    }
  };
    
  const upLike = async () => {
        try {
      const res = await fetch(`/api/user/upLike/${session?.user.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({count: session?.user.LikeCount + 1}),       // 👈 これが必須
      });
      
      update({LikeCount: session?.user.LikeCount + 1 })
      if (!res.ok) {
        throw new Error("サーバーエラー: " + res.status);
      }
      
  
    } catch (error) {
      console.error("エラー:", error);
    }

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
    <div>
      <p>こんにちは {session.user?.name}</p>
      <p>プロフィール</p>
      <p>{session.user?.profile}</p>
      <p>{session.user?.LikeCount}最終的にはsessionに置き換え</p>
      

      <button
          type="button"
          onClick={() => upLike()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >増加</button>

      <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="新しい名前を入力..."
          className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        />
      
        <button
          type="button"
          onClick={() => replaceName(newName)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >送信</button>





        <input
          value={profileSentence}
          onChange={(e) => setProfile(e.target.value)}
          placeholder="新しいプロフィールを入力"
          className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        />
      
        <button
          type="button"
          onClick={() => changeProfile(profileSentence)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >変更</button>
        <div className="px-4 pt-20">
          <button
          type="button"
          onClick={() => deleting()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >一括削除</button>
        <button
          type="button"
          onClick={() => replaceName2("こんにちわ君")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >プリズマ</button>
        </div>
        
        <div className="px-4 py-2">
          <button
           onClick={() => signOut()}
           className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-green-600"
            >ログアウト</button>
        </div>

    </div>
  )
}