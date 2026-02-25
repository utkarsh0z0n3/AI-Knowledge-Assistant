import { useEffect, useState } from "react";
import { api } from "../api/client";
import UploadPanel from "../components/UploadPanel";

export default function HistorySidebar({ onSelect }: any) {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    api.get("/chat/history").then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="w-72 bg-white flex flex-col  dark:bg-gray-900 border-r dark:border-gray-800">
      <h3 className="font-semibold mb-3 dark:text-white m-2">History</h3>

      <div className="space-y-2">
        {history.map((h) => (
          <div
            key={h.id}
            onClick={() => onSelect(h)}
            className="cursor-pointer p-2 rounded hover:bg-gray-100 text-sm dark:hover:bg-gray-800 dark:text-white"
          >
            {h.question.slice(0, 60)}
          </div>
        ))}
      </div>
      <UploadPanel/>
    </div>
  );
}