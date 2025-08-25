// components/Header.tsx
"use client";
import React from "react";
import {
  Cog6ToothIcon,
  UserCircleIcon,
  BoltIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "@/app/chat/layout";

export default function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="h-14 sm:h-16 px-4 sm:px-8 flex items-center justify-between backdrop-blur-lg bg-white/5 border-b border-white/10 relative">
      {/* Animated border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Mobile menu button */}
        <button
          onClick={toggle}
          className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          <Bars3Icon className="w-6 h-6 text-gray-400" />
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm text-gray-300 hidden xs:block">
            Online
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-2 px-2 sm:px-3 py-1 bg-white/5 rounded-lg border border-white/10">
          <BoltIcon className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
          <span className="text-xs text-gray-300 hidden md:block">
            AI Active
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group">
          <Cog6ToothIcon className="w-5 h-5 text-gray-400 group-hover:text-purple-400 group-hover:rotate-45 transition-all duration-300" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
          <UserCircleIcon className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
        </button>
      </div>
    </header>
  );
}
