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
    <div className="p-3 border-t">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="text-sm dark:text-white"
      />

      <button
        onClick={upload}
        className="mt-2 w-full bg-green-600 text-white py-1 rounded hover:bg-green-700 dark:text-white"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {file &&<> <div className="text-xs mt-1">{file.name}</div><button onClick={()=>setFile(null)}>Remove</button></>}
    </div>
  );
}