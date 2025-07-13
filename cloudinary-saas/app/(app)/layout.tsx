"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-gray-100 min-h-screen transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center py-4">
            <ImageIcon className="w-10 h-10 text-blue-400" />
          </div>
          <ul className="menu p-4 flex-grow">
            {sidebarItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-2 rounded-lg transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-800 text-gray-200"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          {user && (
            <div className="p-4">
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-error w-full"
              >
                <LogOutIcon className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow transition-all duration-300">
        {/* Navbar */}
        <header className="w-full bg-gray-900 border-b border-gray-700">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex-none">
              <button
                className="btn btn-square btn-ghost"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <MenuIcon />
              </button>
            </div>
            <div className="flex-1">
              <Link href="/" onClick={handleLogoClick}>
                <div className="btn btn-ghost text-2xl font-bold tracking-tight text-white">
                  Cloudinary Showcase
                </div>
              </Link>
            </div>
            {user && (
              <div className="flex-none flex items-center space-x-4">
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full">
                    <img
                      src={user.imageUrl}
                      alt={
                        user.username || user.emailAddresses[0].emailAddress
                      }
                    />
                  </div>
                </div>
                <span className="text-sm truncate max-w-xs lg:max-w-md text-gray-300">
                  {user.username || user.emailAddresses[0].emailAddress}
                </span>
                <button
                  onClick={handleSignOut}
                  className="btn btn-ghost btn-circle text-gray-300"
                >
                  <LogOutIcon className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-grow pb-20">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
