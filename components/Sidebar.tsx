// components/Sidebar.tsx
"use client";
import React from "react";
import {
  PlusIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "@/app/chat/layout";
import {
  useChatContext,
  LoadingSpinner,
  ErrorMessage,
} from "@/Store/ChatContex";
import "@/app/globals.css";
import { APP_NAME, formatTime } from "@/utils";
import Link from "next/link";

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();

  const {
    chats,
    loading,
    error,
    createNewChat,
    deleteChat,
    actionLoading,
    clearError,
  } = useChatContext();

  // Create new chat handler
  const handleCreateNewChat = async () => {
    try {
      const newChat = await createNewChat(
        "Hello! I'd like to start a new conversation."
      );
      // Navigate to the new chat after creation
      if (newChat) {
        window.location.href = `/conversation/${newChat._id}`;
      }
      toggle();
    } catch (error) {
      console.error("Failed to create new chat:", error);
    }
  };

  // Delete chat handler
  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (confirm("Are you sure you want to delete this conversation?")) {
      try {
        await deleteChat(chatId);
      } catch (error) {
        console.error("Failed to delete chat:", error);
      }
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={toggle}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:relative top-0 left-0 h-full
          w-72 sm:w-80
          backdrop-blur-lg bg-white/5 border-r border-white/10 shadow-2xl 
          p-4 sm:p-6 flex flex-col overflow-hidden
          z-50 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/10 via-transparent to-cyan-900/10 pointer-events-none"></div>

        {/* Mobile close button */}
        <button
          onClick={toggle}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
        >
          <XMarkIcon className="w-6 h-6 text-gray-400" />
        </button>

        {/* Logo & Title */}
        <div className="relative z-10 flex items-center mb-4 sm:mb- pr-10 lg:pr-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
            <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {APP_NAME}
            </h1>
            <p className="text-xs text-gray-400 hidden sm:block">
              Next-Gen Assistant
            </p>
          </div>
        </div>

        {/* New Conversation Button */}
        <button
          onClick={handleCreateNewChat}
          disabled={actionLoading}
          className="w-full mb-4 sm:mb-6 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center group hover:shadow-purple-500/25 hover:shadow-2xl transform hover:scale-[1.02] text-sm sm:text-base"
        >
          {actionLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
          ) : (
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          )}
          <span className="font-semibold">
            {actionLoading ? "Creating..." : "New Chat"}
          </span>
        </button>

        {/* Error Message */}
        {error && (
          <div className="mb-4">
            <ErrorMessage
              error={error}
              onDismiss={clearError}
              variant="inline"
            />
          </div>
        )}

        {/* Loading State */}
        {loading && chats.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner size="md" text="Loading conversations..." />
          </div>
        )}

        {/* Empty State */}
        {!loading && chats.length === 0 && !error && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-400">No conversations yet</p>
              <p className="text-xs text-gray-500 mt-1">
                Create your first chat above
              </p>
            </div>
          </div>
        )}

        {/* 🎨 BEAUTIFUL SCROLLBAR: Conversations List */}
        {chats.length > 0 && (
          <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3 custom-scrollbar">
            {chats.map((chat) => (
              <Link
                href={`/conversation/${chat._id}`}
                key={chat._id}
                className="block"
                onClick={() => toggle()}
              >
                <div
                  className="p-3 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group backdrop-blur-sm"
                  onClick={() => toggle()}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-sm text-white group-hover:text-purple-300 transition-colors truncate pr-2">
                      {chat.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatTime(chat.startTime)}
                      </span>
                      <button
                        onClick={(e) =>{ handleDeleteChat(chat._id, e)
                           e.preventDefault();
    e.stopPropagation();
                        }}
                        className=" opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded transition-all "
                      >
                        <TrashIcon className="w-5 h-5 text-red-400 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-2 truncate">
                    {chat.messages[chat.messages.length - 1]?.content ||
                      "No messages yet"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg border border-purple-500/30 truncate">
                      {chat.model}
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">
                        {chat.messages.length}
                      </span>
                      <ChatBubbleLeftRightIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-4 sm:mt-6 pt-4 border-t border-white/10">
          <div className="flex justify-between text-xs text-gray-400">
            <span className="truncate">Chats: {chats.length}</span>
            <span className="truncate">Pro</span>
          </div>
        </div>
      </aside>
    </>
  );
}
