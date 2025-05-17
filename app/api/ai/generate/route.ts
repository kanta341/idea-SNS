

import { OpenAI } from "openai";
import { NextResponse } from 'next/server';
import "dotenv/config";

const client = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
  });


export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body)
    const question = `\
    ${body.theme}
    `
    
    const response = await client.responses.create({
        model: "gpt-4.1-nano",
        input: body.theme
    });
    return NextResponse.json({suggestion:response.output_text});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  } finally {
  }
}

/*次にやるべきこと
0データベースについて調べる
・フォロー相手についてのデータとかは、各ユーザーが保有しているデータ。
そのため、２次元データみたいにして、多層構造でデータを保存することはできるのか？
また、そうした場合にデータの取得時間が伸びたりするのだろうか？
１データベースの更新
・ポストのデータ（これはユーザーに紐ずいた多層構造でなくてもいいかなって思う。規模も小さいし）
・このポストのカラムには、LIKE数、投稿日時、投稿ユーザー、（エンゲージメント）
２
・データベースとセッションを紐付けながら、投稿のシステムを構築（この段階ではタイムラインではなく、
アイディアページで生成→ポスト→自分のポストがプロフィールに表示って流れを実装
３
タイムラインの実装。しっかり、データベース検索に基づいてタイムラインを構築。
4
テーマとキーワードの生成方法確立
５その他の見た目を整える
６リプライなどの細かい機能を実装
７一度、テストで使用してみる。

*/