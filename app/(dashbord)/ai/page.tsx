"use client";

import { useEffect, useState } from "react";

export default function IdeaGeneratorPage() {
  // -------- State --------
  const [theme, setTheme] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [loadingSuggestion, setLoadingSuggestion] = useState<boolean>(false);
  const [finalIdea, setFinalIdea] = useState<string>("");

  // -------- Initial fetch --------
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const themeRes = await fetch("/api/themes/today");
        if (themeRes.ok) {
          const { theme } = await themeRes.json();
          setTheme(theme);
        }

        const kwRes = await fetch("/api/themes/keyword");
        if (kwRes.ok) {
            
          const { keywords } = await kwRes.json();
          console.log(keywords)
          setKeywords(keywords);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchInitialData();
  }, []);

  // -------- Handlers --------
  const handleKeywordClick = async (kw: string) => {
    setSelectedKeyword(kw);
    setLoadingSuggestion(true);
    setAiSuggestion("");

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme, keyword: kw }),
      });

      if (res.ok) {
        const { suggestion } = await res.json();
        setAiSuggestion(suggestion);
      } else {
        setAiSuggestion("エラーが発生しました");
      }
    } catch (err) {
      console.error(err);
      setAiSuggestion("エラーが発生しました");
    } finally {
      setLoadingSuggestion(false);
    }
  };

  const handleSubmit = async() => {
        try {
        const res = await fetch("/api/users/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content:finalIdea }),
        });
        if (res.ok) {
          const { theme } = await res.json();
          setTheme(theme);
        }

        const kwRes = await fetch("/api/themes/keyword");
        if (kwRes.ok) {
            
          const { keywords } = await kwRes.json();
          console.log(keywords)
          setKeywords(keywords);
        }
      } catch (err) {
        console.error(err);
      }
  };

  // -------- UI --------
  return (
    <div className="min-h-screen flex flex-col justify-between px-4 py-6">
      {/* Theme */}
      <h1 className="text-3xl font-bold text-center mb-8">
        {theme || "Loading..."}
      </h1>

      {/* Keyword buttons & AI output */}
      <div className="flex flex-col items-center">
        {/* Keywords */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {keywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => handleKeywordClick(kw)}
              className={
                "px-4 py-2 rounded-xl border-2 border-orange-400 bg-orange-200 hover:bg-orange-300 transition text-purple-700 font-semibold" +
                (selectedKeyword === kw ? " ring-2 ring-purple-500" : "")
              }
            >
              {kw}
            </button>
          ))}
        </div>

        {/* AI suggestion */}
        <div className="w-full max-w-3xl bg-gray-100 rounded-lg p-4 min-h-[120px]">
          {loadingSuggestion ? (
            <p className="text-center text-gray-500">生成中...</p>
          ) : (
            <p className="whitespace-pre-wrap">{aiSuggestion}</p>
          )}
        </div>
      </div>

      {/* User input & send */}
      <div className="w-full py-30 flex items-end justify-center mt-8">
        <textarea
          value={finalIdea}
          onChange={(e) => setFinalIdea(e.target.value)}
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
