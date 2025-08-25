// // app/conversation/[id]/page.tsx
// "use client";
// import React, { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useChatContext } from '@/Store/ChatContex';
// import { LoadingSpinner, ErrorMessage } from '@/Store/ChatContex';
// import { ArrowLeftIcon, SparklesIcon, UserCircleIcon } from '@heroicons/react/24/outline';
// import { Conversation, Message } from '@/types/conversation';
// import MessageInput from '@/components/MessageInput';
// import Sidebar from '@/components/Sidebar';

// export default function ConversationPage() {
//   const params = useParams();
//   const router = useRouter();
//   const conversationId = params.id as string;
  
//   const { 
//     chats, 
//     loading, 
//     error, 
//     sendMessage, 
//     getChatById,
//     actionLoading 
//   } = useChatContext();
  
//   const [currentChat, setCurrentChat] = useState<Conversation | null>(null);

//   // Find the current chat
//   useEffect(() => {
//     if (conversationId && chats.length > 0) {
//       const chat = getChatById(conversationId);
//       setCurrentChat(chat || null);
//     }
//   }, [conversationId, chats, getChatById]);

//   // Handle sending messages
//   const handleSendMessage = async (prompt: string) => {
//     if (!conversationId) return;
//     try {
//       await sendMessage(conversationId, prompt);
//       // Update current chat after sending message
//       const updatedChat = getChatById(conversationId);
//       setCurrentChat(updatedChat || null);
//     } catch (error) {
//       console.error('Failed to send message:', error);
//     }
//   };

//   // Loading state
//   if (loading && !currentChat) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <LoadingSpinner size="lg" text="Loading conversation..." />
//       </div>
//     );
//   }

//   // Error state
//   if (error && !currentChat) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
//         <ErrorMessage error={error} variant="card" />
//       </div>
//     );
//   }

//   // Chat not found
//   if (!currentChat && !loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-white mb-4">Conversation Not Found</h2>
//           <p className="text-gray-400 mb-6">This conversation doesn&apos;t exist or has been deleted.</p>
//           <button
//             onClick={() => router.push('/chat')}
//             className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg text-white font-medium transition-all"
//           >
//             <ArrowLeftIcon className="w-4 h-4 inline mr-2" />
//             Back to Conversations
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Animated background particles */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -inset-10 opacity-30">
//           <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//           <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//           <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//         </div>
//       </div>

//       <div className="relative z-10 flex h-screen">
//         {/* Sidebar */}
//         <Sidebar />
        
//         {/* Main Chat Area */}
//         <div className="flex-1 flex flex-col min-w-0">
//           {/* Chat Header */}
//           <div className="border-b border-white/10 bg-white/5 backdrop-blur-lg p-4 flex-shrink-0">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4 min-w-0">
//                 <button
//                   onClick={() => router.push('/landing')}
//                   className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
//                 >
//                   <ArrowLeftIcon className="w-5 h-5 text-gray-400" />
//                 </button>
//                 <div className="min-w-0 flex-1">
//                   <h1 className="text-lg font-semibold text-white truncate">
//                     {currentChat?.title || 'Loading...'}
//                   </h1>
//                   {currentChat && (
//                     <div className="flex items-center space-x-2 mt-1">
//                       <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg border border-purple-500/30">
//                         {currentChat.model}
//                       </span>
//                       <span className="text-xs text-gray-400">
//                         {currentChat.messages.length} messages
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Messages Area */}
//           <div className="flex-1 overflow-hidden">
//             <div className="h-full flex flex-col">
//               {/* Messages Container */}
//               <div className="flex-1 overflow-y-auto custom-scrollbar">
//                 <div className="p-4 space-y-4 max-w-7xl mx-auto">
//                   {currentChat?.messages.map((message: Message, index: number) => (
//                     <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                       {/* AI Message */}
//                       {message.role === 'assistant' && (
//                         <div className="flex items-start space-x-3 max-w-3xl">
//                           <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
//                             <SparklesIcon className="w-5 h-5 text-white" />
//                           </div>
//                           <div className="bg-white/5 backdrop-blur-lg border border-white/10 text-white p-4 rounded-2xl rounded-tl-md shadow-lg">
//                             <div className="whitespace-pre-wrap">{message.content}</div>
//                           </div>
//                         </div>
//                       )}

//                       {/* User Message */}
//                       {message.role === 'user' && (
//                         <div className="flex items-start space-x-3 justify-end max-w-3xl">
//                           <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-4 rounded-2xl rounded-tr-md shadow-lg">
//                             <div className="whitespace-pre-wrap">{message.content}</div>
//                           </div>
//                           <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
//                             <UserCircleIcon className="w-5 h-5 text-white" />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
                  
//                   {/* Loading indicator for new messages */}
//                   {actionLoading && (
//                     <div className="flex justify-start">
//                       <div className="flex items-start space-x-3">
//                         <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
//                           <SparklesIcon className="w-5 h-5 text-white" />
//                         </div>
//                         <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl rounded-tl-md">
//                           <LoadingSpinner size="sm" />
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Empty state */}
//                   {currentChat?.messages.length === 0 && (
//                     <div className="flex items-center justify-center h-full">
//                       <div className="text-center">
//                         <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                           <SparklesIcon className="w-8 h-8 text-white" />
//                         </div>
//                         <h3 className="text-lg font-semibold text-white mb-2">Start the Conversation</h3>
//                         <p className="text-gray-400">Send your first message to begin chatting with AI.</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Message Input */}
//               <div className="border-t border-white/10 bg-white/5 backdrop-blur-lg flex-shrink-0">
//                 <div className="max-w-4xl mx-auto">
//                   <MessageInput 
//                     onSendMessage={handleSendMessage}
//                     loading={actionLoading}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/conversation/[id]/page.tsx
"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useChatContext } from '@/Store/ChatContex';
import { LoadingSpinner, ErrorMessage } from '@/Store/ChatContex';
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Conversation, Message } from '@/types/conversation';
import MessageInput from '@/components/MessageInput';
import Sidebar from '@/components/Sidebar';
import AIMessage from '@/components/AiMessage';
import UserMessage from '@/components/UserMessage';

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.id as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    chats, 
    loading, 
    error, 
    sendMessage, 
    getChatById,
    actionLoading 
  } = useChatContext();
  
  const [currentChat, setCurrentChat] = useState<Conversation | null>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Find the current chat
  useEffect(() => {
    if (conversationId && chats.length > 0) {
      const chat = getChatById(conversationId);
      setCurrentChat(chat || null);
    }
  }, [conversationId, chats, getChatById]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, actionLoading]);

  // Handle sending messages
  const handleSendMessage = async (prompt: string) => {
    if (!conversationId) return;
    try {
      await sendMessage(conversationId, prompt);
      const updatedChat = getChatById(conversationId);
      setCurrentChat(updatedChat || null);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Loading state
  if (loading && !currentChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading conversation..." />
      </div>
    );
  }

  // Error state
  if (error && !currentChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <ErrorMessage error={error} variant="card" />
      </div>
    );
  }

  // Chat not found
  if (!currentChat && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Conversation Not Found</h2>
          <p className="text-gray-400 mb-6">This conversation doesn&apos;t exist or has been deleted.</p>
          <button
            onClick={() => router.push('/landing')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg text-white font-medium transition-all"
          >
            <ArrowLeftIcon className="w-4 h-4 inline mr-2" />
            Back to Conversations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="border-b border-white/10 bg-white/5 backdrop-blur-lg p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 min-w-0">
                <button
                  onClick={() => router.push('/landing')}
                  className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5 text-gray-400" />
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg font-semibold text-white truncate">
                    {currentChat?.title || 'Loading...'}
                  </h1>
                  {currentChat && (
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg border border-purple-500/30">
                        {currentChat.model}
                      </span>
                      <span className="text-xs text-gray-400">
                        {currentChat.messages.length} messages
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-4 space-y-6 max-w-7xl mx-auto">
                  {currentChat?.messages.map((message: Message, index: number) => (
                    <div key={index}>
                      {message.role === 'assistant' ? (
                        <AIMessage message={message} />
                      ) : (
                        <UserMessage message={message} />
                      )}
                    </div>
                  ))}
                  
                  {/* Loading indicator for new messages */}
                  {actionLoading && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <SparklesIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl rounded-tl-md">
                        <div className="flex items-center space-x-2">
                          <LoadingSpinner size="sm" />
                          <span className="text-sm text-gray-400">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Empty state */}
                  {currentChat?.messages.length === 0 && (
                    <div className="flex items-center justify-center h-full min-h-[400px]">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <SparklesIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Start the Conversation</h3>
                        <p className="text-gray-400">Send your first message to begin chatting with AI.</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t border-white/10 bg-white/5 backdrop-blur-lg flex-shrink-0">
                <div className="max-w-6xl mx-auto">
                  <MessageInput 
                    onSendMessage={handleSendMessage}
                    loading={actionLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

