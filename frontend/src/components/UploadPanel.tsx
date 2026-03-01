import { useState } from "react";
import { api } from "../api/client";

export default function UploadPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    setLoading(true);
    await api.post("/documents/upload", form);
    setLoading(false);

    alert("Uploaded!");
    setFile(null);
  };

  return (
    <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900">
      <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
        Upload a PDF document
      </label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-600 file:mr-3 file:rounded file:border-0 file:bg-slate-200 file:px-2 file:py-1 file:text-xs file:font-semibold dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:file:bg-slate-700"
      />

      <button
        onClick={upload}
        className="mt-3 w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-60"
        disabled={!file || loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {file && (
        <div className="mt-2 rounded-md bg-white p-2 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <div className="truncate">{file.name}</div>
          <button
            onClick={() => setFile(null)}
            className="mt-1 text-rose-500 hover:text-rose-400"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
