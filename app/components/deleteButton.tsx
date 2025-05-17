"use client"


export default function Deletebutton() {
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

  return (
    <div>
        <button
          type="button"
          onClick={() => deleting()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >一括削除</button>

    </div>
  )
}