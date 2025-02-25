"use client";
import { useState } from "react";
import { uploadFile } from "../../actions/fileupload";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function handleUpload(event: React.FormEvent) {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadFile(formData);
    if (result) {
      setMessage("Fayl yuklandi: " + result.name);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Fayl yuklash</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Yuklash
        </button>
      </form>
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  );
}
