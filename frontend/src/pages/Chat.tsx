import { useEffect, useState } from "react";
import { api } from "../api/client";
import HistorySidebar from "./HistorySidebar";
import TypingMessage from "../components/TypingMessage";
import Citation from "../components/Citation";
import useTheme from "../hooks/useTheme";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { dark, setDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  const ask = async () => {
    if (!question.trim()) return;

    const userMessage = { role: "user", text: question };

    setMessages((m) => [...m, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await api.post("/search/ask", { question });

      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: res.data.answer,
          sources: res.data.sources,
        },
      ]);
    } catch (err) {
      setMessages((m) => [...m, { role: "ai", text: "Something went wrong." }]);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex bg-slate-100 dark:bg-slate-950">
      <HistorySidebar
        onSelect={(h: any) =>
          setMessages([
            { role: "user", text: h.question },
            { role: "ai", text: h.answer },
          ])
        }
      />

      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 bg-white/95 backdrop-blur dark:bg-slate-900 dark:border-slate-800 dark:text-white flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-300">
              AI Knowledge Assistant
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Ask questions over your uploaded documents</div>
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="text-sm px-3 py-1.5 border rounded-lg transition border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-slate-950 dark:to-slate-900">
          {messages.length === 0 && (
            <div className="mx-auto mt-20 max-w-lg rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
              Start with a question like <span className="font-semibold">“Summarize my latest uploaded document”</span>.
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-2xl p-4 rounded-2xl shadow-sm ${
                m.role === "user"
                  ? "ml-auto bg-indigo-600 text-white shadow-indigo-200/50 dark:shadow-none"
                  : "bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
              }`}
            >
              <div className="leading-relaxed">
                {m.role === "ai" ? <TypingMessage text={m.text} /> : <div>{m.text}</div>}
              </div>

              {m.sources && (
                <div className="text-xs mt-3 text-slate-500">
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.sources.map((s: any, i: number) => (
                      <Citation key={i} content={s.preview} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && <div className="text-slate-400 animate-pulse">AI thinking...</div>}
        </div>

        <div className="border-t border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 p-4 flex gap-2">
          <input
            className="flex-1 border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything from your uploaded docs..."
            onKeyDown={(e) => e.key === "Enter" && ask()}
          />

          <button
            onClick={ask}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
