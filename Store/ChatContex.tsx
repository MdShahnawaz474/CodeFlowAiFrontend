
"use client";
import { API_BASE_URL } from "@/lib/axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Conversation, ChatContextType } from "@/types/conversation";
import { useAuth } from "./AuthContext";

// ==================== LOADING COMPONENTS ====================

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  text, 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {/* Spinning Circle */}
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-purple-500`}></div>
      
      {/* Animated Dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      
      {/* Loading Text */}
      {text && (
        <p className="text-sm text-gray-400 animate-pulse">{text}</p>
      )}
    </div>
  );
}

// Skeleton Loading Component
export function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              <div className="h-3 bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==================== ERROR COMPONENTS ====================

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'banner' | 'card' | 'inline';
}

export function ErrorMessage({ 
  error, 
  onRetry, 
  onDismiss, 
  variant = 'card' 
}: ErrorMessageProps) {
  const baseClasses = "flex items-start space-x-3 text-red-300";
  
  const variantClasses = {
    banner: "p-4 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-lg",
    card: "p-6 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-lg shadow-lg", 
    inline: "p-3 bg-red-500/15 rounded-lg"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      <div className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-red-300 mb-1">
          Something went wrong
        </h3>
        <p className="text-sm text-red-200 break-words">
          {error}
        </p>
        
        {(onRetry || onDismiss) && (
          <div className="flex items-center space-x-3 mt-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center px-3 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Try Again
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-xs text-red-300 hover:text-red-200 transition-colors"
              >
                Dismiss
              </button>
            )}
          </div>
        )}
      </div>
      
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-red-500/20 rounded-lg transition-colors flex-shrink-0"
        >
          <svg className="w-4 h-4 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Network Error Component
export function NetworkErrorMessage({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center p-8">
      <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Connection Error</h3>
      <p className="text-gray-400 mb-4">
        Unable to connect to the server. Please check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg transition-all text-white font-medium"
      >
        <svg className="w-4 h-4 inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Retry Connection
      </button>
    </div>
  );
}

// Empty State Component
export function EmptyState({ 
  title = "No conversations yet", 
  description = "Start your first conversation to get started",
  actionText = "Create New Chat",
  onAction 
}: { 
  title?: string; 
  description?: string; 
  actionText?: string;
  onAction?: () => void;
}) {
  return (
    <div className="text-center p-8">
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-white/10">
        <svg className="w-8 h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.627 2.707-3.227V6.741c0-1.6-1.123-2.994-2.707-3.227A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.514C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg transition-all text-white font-medium"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

// ==================== CONTEXT LOGIC ====================

// Create context with proper typing

export const chatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
   const { token } = useAuth();
  const [chats, setChats] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // ✅ Separate loading states
  const [actionLoading, setActionLoading] = useState(false); // For sending messages only
  const [createLoading, setCreateLoading] = useState(false); // For creating chats only
  const [deleteLoading, setDeleteLoading] = useState(false); // For deleting chats

  // Create new chat
  const createNewChat = async (prompt: string, model: string = 'gemini-2.5-flash') => {
     if (!token) throw new Error("Not authenticated");
    setCreateLoading(true); // ✅ Use createLoading instead of actionLoading
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/conversations`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,  
        },
        body: JSON.stringify({ prompt, model }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create conversation: ${response.status}`);
      }

      const newChat = await response.json();
      setChats(prev => [newChat, ...prev]); // Add to chats immediately
      return newChat;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create conversation';
      setError(errorMessage);
      throw err;
    } finally {
      setCreateLoading(false); // ✅ Reset createLoading
    }
  };

  // Send message to chat
  const sendMessage = async (chatId: string, prompt: string) => {
    setActionLoading(true); // ✅ Keep actionLoading for message sending only
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${chatId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,  
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status}`);
      }

      const updatedChat = await response.json();
      setChats(prev => 
        prev.map(chat => chat._id === updatedChat._id ? updatedChat : chat)
      );
      return updatedChat;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // Delete chat
  const deleteChat = async (chatId: string) => {
    setDeleteLoading(true); // ✅ Use deleteLoading
    setError(null);
    
    const previousChats = chats;
    setChats(prev => prev.filter(chat => chat._id !== chatId));
    
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${chatId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,  
        },
      });

      if (!response.ok) {
        setChats(previousChats);
        throw new Error(`Failed to delete conversation: ${response.status}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete conversation';
      setError(errorMessage);
      setChats(previousChats);
      throw err;
    } finally {
      setDeleteLoading(false);
    }
  };

  // Fetch chats
  const fetchChats = async () => {
    if (!token) return; // Don't fetch if unauthenticated
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/conversations`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,  
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const chatsData = await response.json();
      setChats(Array.isArray(chatsData) ? chatsData : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch conversations';
      setError(errorMessage);
      console.error('Error fetching chats:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get chat by ID
  const getChatById = (chatId: string): Conversation | undefined => {
    return chats.find(chat => chat._id === chatId);
  };

  // Refresh chats
  const refreshChats = async () => {
    await fetchChats();
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };


  useEffect(() => {
    if (token) fetchChats();
    else setChats([]); // If logout, reset chat
  }, [token]);

  const contextValue: ChatContextType = {
    chats,
    loading,
    error,
    actionLoading,    // ✅ For message sending only
    createLoading,    // ✅ For chat creation
    deleteLoading,    // ✅ For chat deletion
    createNewChat,
    sendMessage,
    deleteChat,
    refreshChats,
    clearError,
    getChatById,
  };

  return (
    <chatContext.Provider value={contextValue}>
      {children}
    </chatContext.Provider>
  );
};


// Custom hook to use chat context
export const useChatContext = () => {
  const context = useContext(chatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

// ==================== USAGE COMPONENTS ====================

// Example usage component for displaying chat list
export function ChatList() {
  const { 
    chats, 
    loading, 
    error, 
    actionLoading,
    deleteChat, 
    refreshChats, 
    clearError,
    createNewChat
  } = useChatContext();

  const handleDeleteChat = async (chatId: string) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      try {
        await deleteChat(chatId);
      } catch (error) {
        console.error('Failed to delete chat:', error);
      }
    }
  };

  const handleCreateNewChat = async () => {
    try {
      await createNewChat("Hello! I'd like to start a new conversation.");
    } catch (error) {
      console.error('Failed to create chat:', error);
    }
  };

  // Loading state for initial load
  if (loading && chats.length === 0) {
    return (
      <div className="p-6">
        <LoadingSpinner size="lg" text="Loading conversations..." />
        <SkeletonLoader className="mt-6" />
      </div>
    );
  }

  // Error state for initial load
  if (error && chats.length === 0) {
    return (
      <div className="p-6">
        <NetworkErrorMessage onRetry={refreshChats} />
      </div>
    );
  }

  // Empty state
  if (chats.length === 0 && !loading) {
    return (
      <div className="p-6">
        <EmptyState
          title="No conversations yet"
          description="Start your first AI conversation"
          actionText="Create New Chat"
          onAction={handleCreateNewChat}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Error banner for non-critical errors */}
      {error && chats.length > 0 && (
        <ErrorMessage
          error={error}
          onRetry={refreshChats}
          onDismiss={clearError}
          variant="banner"
        />
      )}

      {/* New Chat Button */}
      <button
        onClick={handleCreateNewChat}
        disabled={actionLoading}
        className="w-full mb-6 p-4 border-2 border-dashed border-white/20 hover:border-purple-500/50 rounded-xl transition-all duration-300 group hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center justify-center space-x-2">
          {actionLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 group-hover:rotate-90 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          )}
          <span className="text-lg font-semibold text-gray-300 group-hover:text-white">
            {actionLoading ? 'Creating...' : 'Start New Conversation'}
          </span>
        </div>
      </button>

      {/* Chat list */}
      <div className="space-y-3">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className="p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate group-hover:text-purple-300 transition-colors">
                  {chat.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1 truncate">
                  {chat.messages[chat.messages.length - 1]?.content || 'No messages yet'}
                </p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg border border-purple-500/30">
                    {chat.model}
                  </span>
                  <span className="text-xs text-gray-500">
                    {chat.messages.length} messages
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteChat(chat._id)}
                className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded-lg transition-all text-red-400 hover:text-red-300"
              >
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action loading indicator */}
      {actionLoading && chats.length > 0 && (
        <div className="flex justify-center mt-6">
          <LoadingSpinner size="sm" text="Processing..." />
        </div>
      )}
    </div>
  );
}
