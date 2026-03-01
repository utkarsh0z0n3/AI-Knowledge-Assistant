import { useEffect, useState } from "react";
import { api } from "../api/client";
import UploadPanel from "../components/UploadPanel";

export default function HistorySidebar({ onSelect }: any) {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    api.get("/chat/history").then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="w-80 bg-white flex flex-col dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-semibold dark:text-white">Conversation History</h3>
        <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">Tap any previous question to reopen context.</p>
      </div>

      <div className="space-y-2 p-3 overflow-y-auto flex-1">
        {history.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 p-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No previous chats yet.
          </div>
        )}

        {history.map((h) => (
          <div
            key={h.id}
            onClick={() => onSelect(h)}
            className="cursor-pointer p-3 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50 text-sm text-slate-700 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-200 transition"
          >
            {h.question.slice(0, 90)}
          </div>
        ))}
      </div>
      <UploadPanel />
    </div>
  );
}
