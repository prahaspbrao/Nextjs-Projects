"use client";

import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { DownloadCloud } from "lucide-react";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    "Instagram Square (1:1)"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadedImage) setIsTransforming(true);
  }, [selectedFormat, uploadedImage]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setUploadedImage(data.publicId);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="pb-3 text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-300 via-sky-400 to-indigo-500 text-transparent bg-clip-text">
            Social Media Image Formatter
          </h1>
          <p className="max-w-xl mx-auto">
            Upload your image and instantly resize it to fit Instagram, Twitter,
            Facebook, and more.
          </p>
        </div>

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg">
          {/* Upload */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-white">
              Upload your image
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                onChange={handleFileUpload}
                className="
                  w-full max-w-md
                  rounded-md
                  bg-gray-700
                  text-white
                  border border-gray-600
                  file:bg-cyan-600 file:text-white file:border-0
                  file:px-3 file:py-1.5
                  file:rounded-md
                  hover:file:bg-cyan-700
                  focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1
                  cursor-pointer
                "
              />
              {isUploading && (
                <span className="loading loading-dots loading-md text-cyan-400" />
              )}
            </div>
          </div>

          {uploadedImage && (
            <>
              {/* Format Selection */}
              <div className="mb-6">
                <label className="block mb-2 font-medium text-white">
                  Choose Format
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) =>
                    setSelectedFormat(e.target.value as SocialFormat)
                  }
                  className="select select-bordered w-full max-w-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-400"
                >
                  {Object.keys(socialFormats).map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preview */}
              <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black bg-opacity-20 p-4">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Preview
                </h2>
                <div className="flex justify-center relative">
                  {isTransforming && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                      <span className="loading loading-spinner loading-lg text-white" />
                    </div>
                  )}
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    crop="fill"
                    gravity="auto"
                    sizes="100vw"
                    alt="Transformed"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                    className="rounded-lg max-h-[500px] object-contain transition duration-300 shadow-md"
                  />
                </div>
              </div>

              {/* Download Button */}
              <div className="mt-6 text-right">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-md transition duration-200 hover:scale-105"
                >
                  <DownloadCloud className="w-4 h-4" />
                  Download for {selectedFormat}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
