"use client";

import { Sparkles, Rocket, Cloud, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white"
      data-theme="synthwave"
    >
      <div className="max-w-6xl mx-auto py-24 w-full text-center space-y-16">
        {/* Heading */}
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
            Vidio Vault
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Upload, compress, and manage videos in seconds — powered by Cloudinary, enhanced by AI.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up delay-300">
          {[
            {
              icon: <Sparkles className="w-7 h-7" />,
              title: "AI Compression",
              desc: "Smartly compress videos with up to 90% space savings.",
            },
            {
              icon: <Cloud className="w-7 h-7" />,
              title: "Cloud Hosted",
              desc: "Instant, secure & globally-distributed video delivery.",
            },
            {
              icon: <ShieldCheck className="w-7 h-7" />,
              title: "Privacy First",
              desc: "Your uploads are encrypted & user-authenticated.",
            },
            {
              icon: <Rocket className="w-7 h-7" />,
              title: "Lightning Fast",
              desc: "Optimized CDN & GPU-accelerated video handling.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-accent mb-3">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up delay-500">
          <a
            href="/upload"
            className="inline-flex items-center px-6 py-3 bg-accent text-black font-medium rounded-full shadow-lg hover:scale-105 hover:bg-accent/90 transition"
          >
            🚀 Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
