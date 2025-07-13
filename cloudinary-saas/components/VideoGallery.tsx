"use client";
import { useState } from "react";
import VideoCard from "./VideoCard";
import { Video } from "@/types";

const dummyData: Video[] = [
  {
    id: "abc123",
    title: "Test Video",
    description: "This is a test video",
    publicId: "s5vf5catyt5kyfbwxvwb",
    originalSize: 1000000,
    compressedSize: 400000,
    duration: 30,
    createdAt: new Date(),
  },
];

export default function VideoGallery() {
  const [videoList, setVideoList] = useState<Video[]>(dummyData);

  const handleDownload = (url: string, title: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.mp4`;
    a.click();
  };

  const handleEdit = (video: Video) => {
    console.log("EDIT CLICKED", video);
    alert("Editing video: " + video.title);
  };

  const handleDelete = (id: string) => {
    console.log("DELETE CLICKED:", id);
    setVideoList((prev) => [...prev.filter((v) => v.id !== id)]);
    alert("Deleted video with ID: " + id);
  };

  console.log("Rendering video list:", videoList);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {videoList.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onDownload={handleDownload}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
