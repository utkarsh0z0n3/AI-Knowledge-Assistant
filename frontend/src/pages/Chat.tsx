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

  useEffect(()=>{
    const token = localStorage.get("token");
    
    if(!token)
    {
      navigate("/login");
    }
  },[])

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
    <div className="h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <HistorySidebar
        onSelect={(h: any) =>
          setMessages([
            { role: "user", text: h.question },
            { role: "ai", text: h.answer },
          ])
        }
      />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-white dark:bg-gray-900 dark:text-white flex justify-between">
          <div className="font-semibold">AI Knowledge Assistant</div>

          <button
            onClick={() => setDark(!dark)}
            className="text-sm px-3 py-1 border rounded dark:border-gray-700"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-xl p-4 rounded-xl shadow-sm ${
                m.role === "user"
                  ? "ml-auto bg-blue-500 text-white shadow-md"
                  : "bg-white border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              }`}
            >
              <div>
                {m.role === "ai" ? (
                  <TypingMessage text={m.text} />
                ) : (
                  <div>{m.text}</div>
                )}
              </div>

              {m.sources && (
                <div className="text-xs mt-2 text-gray-500">
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.sources.map((s: any, i: number) => (
                      <Citation key={i} content={s.preview} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="text-gray-400 animate-pulse">AI thinking...</div>
          )}
        </div>

        {/* Input */}
        <div className="border-t bg-white dark:bg-gray-900 dark:border-gray-700 p-4 flex gap-2">
          <input
            className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something..."
          />

          <button
            onClick={ask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
