import { useState } from "react";

export default function Citation({ content }: { content: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2 p-3 text-sm bg-gray-50 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
      >
        {open ? "Hide source ▲" : "View source ▼"}
      </div>

      {open && (
        <div className="mt-2 p-3 text-sm bg-gray-50 border rounded">
          {content}
        </div>
      )}
    </div>
  );
}