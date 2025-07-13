"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size too large (max 70MB)");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      await axios.post("/api/video-upload", formData);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-200 mb-2 drop-shadow-md">
            Upload a New Video
          </h1>
          <p className="text-gray-400">
            Fill in the details and share your content with the world.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 border border-gray-600 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Video Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="My Awesome Video"
                className="w-full rounded-md px-4 py-2 bg-gray-900 border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* Description (textarea with lighter bg) */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="What is this video about?"
                className="w-full rounded-md px-4 py-3 bg-gray-700 border border-gray-500 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
              />
            </div>

            {/* File Upload (custom file input style) */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Select Video File
              </label>
              <input
                type="file"
                accept="video/*"
                required
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="
      w-full max-w-md
      rounded-md
      bg-gray-700
      text-gray-200
      border border-gray-600
      file:bg-cyan-600 file:text-white file:border-0
      file:px-3 file:py-1.5
      file:rounded-md
      hover:file:bg-cyan-700
      focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1
      cursor-pointer
    "
              />
              <p className="text-xs text-gray-400 mt-1">Max size: 70MB</p>
            </div>

            {/* Submit Button with distinct grey-blue gradient */}
            <div className="text-right">
              <button
                type="submit"
                disabled={isUploading}
                className={`inline-flex items-center px-6 py-2 rounded-full text-sm font-semibold
    bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600
    text-white shadow-lg shadow-cyan-600/70
    hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700
    transition-transform duration-200 ${
      isUploading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
    }`}
              >
                <UploadCloud className="w-5 h-5 mr-2" />
                {isUploading ? "Uploading..." : "Upload Video"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;
