import { Download, Pencil, Trash } from "lucide-react";
import { getCldVideoUrl } from "next-cloudinary";
import { Video } from "@/types";

interface Props {
  video: Video;
  onDownload?: (url: string, title: string) => void;
  onEdit?: (video: Video) => void;
  onDelete?: (id: string) => void;
}

const VideoCard = ({ video, onDownload, onEdit, onDelete }: Props) => {
  const videoUrl = getCldVideoUrl({ src: video.publicId });

  return (
    <div className="p-4 border rounded-lg bg-gray-900 text-white">
      <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
      <video src={videoUrl} controls className="w-full mb-3 rounded" />
      <div className="flex gap-2">
        
       <button
  onClick={() => {
    if (confirm(`Are you sure you want to delete "${video.title}"?`)) {
      onDelete?.(video.id);
    }
  }}
  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
>
  <Trash className="w-4 h-4" />
  Delete
</button>

      </div>
    </div>
  );
};

export default VideoCard;
