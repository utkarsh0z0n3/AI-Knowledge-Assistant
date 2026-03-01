import { useState } from "react";

export default function Citation({ content }: { content: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md font-medium dark:bg-indigo-500/20 dark:text-indigo-300"
      >
        {open ? "Hide source ▲" : "View source ▼"}
      </button>

      {open && (
        <div className="mt-2 rounded-md border border-slate-200 bg-white p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {content}
        </div>
      )}
    </div>
  );
}
