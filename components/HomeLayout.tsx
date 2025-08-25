"use client";
import "./globals.css";
import React, { createContext, useContext, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";


const SidebarContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
}>({
  isOpen: false,
  toggle: () => {},
});


export const useSidebar = () => useContext(SidebarContext);

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen overflow-hidden">
        <SidebarContext.Provider value={{ isOpen: sidebarOpen, toggle: () => setSidebarOpen(!sidebarOpen) }}>
          {/* Animated background particles */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -inset-10 opacity-50">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
          </div>
          
          <div className="relative z-10 flex h-screen">
            <Sidebar />
            {/* Mobile overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <div className="flex-1 flex flex-col backdrop-blur-sm min-w-0">
              <Header />
              <main className="flex-1 overflow-hidden">{children}</main>
            </div>
          </div>
        </SidebarContext.Provider>
      </body>
    </html>
  );
}