"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";
import { Loader2, VideoIcon } from "lucide-react";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch videos from backend
  const fetchVideos = useCallback(async () => {
    try {
      const res = await axios.get("/api/videos");
      setVideos(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load videos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Download handler
  const handleDownload = (url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.mp4`;
    link.click();
  };

  // Edit handler (for now just an alert)
  const handleEdit = (video: Video) => {
    alert("Editing: " + video.title);
  };

  // Delete from Cloudinary + DB
  const handleDelete = async (video: Video) => {
    const confirmDelete = confirm(`Are you sure you want to delete "${video.title}"?`);
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`/api/videos/${video.id}`);
      if (res.data.success) {
        setVideos((prev) => prev.filter((v) => v.id !== video.id));
        alert("Deleted successfully!");
      } else {
        alert("Failed to delete: " + res.data.error);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed.");
    }
  };

  // UI States
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 animate-spin text-gray-400 mb-2" />
          <p className="text-lg">Loading videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">🎥 Your Video Library</h1>

        {error && (
          <div className="text-center text-red-400 font-semibold mb-6">{error}</div>
        )}

        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <VideoIcon className="w-12 h-12 mb-4" />
            <p className="text-lg">No videos found. Upload some to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDownload={handleDownload}
                onEdit={handleEdit}
                onDelete={() => handleDelete(video)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
