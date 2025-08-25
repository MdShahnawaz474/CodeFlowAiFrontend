// // components/ChatWindow.tsx
// "use client";
// import React from "react";
// import { CommandLineIcon, SparklesIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
// import { useChatContext, LoadingSpinner } from "@/Store/ChatContex";

// export default function ChatWindow() {
  
//   const { 
//     chats, 
//     loading, 
//     error, 
//     createNewChat, 
//     deleteChat,
//     actionLoading, // ✅ Already available
//     clearError 
//   } = useChatContext();

//   const handleCreateNewChat = async () => {
//     try {
//       const newChat = await createNewChat("Hello! I'd like to start a new conversation.");
//       // Navigate to the new chat after creation
//       if (newChat) {
//         window.location.href = `/conversation/${newChat._id}`;
//       }
//     } catch (error) {
//       console.error('Failed to create new chat:', error);
//     }
//   };

//   return (
//     <section className="h-full flex flex-col items-center justify-center relative overflow-hidden">
//       {/* Animated background grid */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]"></div>
      
//       <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
//         {/* Main Icon */}
//         <div className="w-24 h-24 mx-auto mb-8 relative">
//           <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
//           <div className="relative w-full h-full bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
//             <SparklesIcon className="w-12 h-12 text-white animate-spin-slow" />
//           </div>
//         </div>

//         {/* Main Text */}
//         <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
//           Welcome to Gemini AI
//         </h2>
//         <p className="text-xl text-gray-300 mb-8 leading-relaxed">
//           Experience the future of AI conversation. Start a new chat or select from your previous conversations.
//         </p>

//         {/* Feature Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/25">
//             <CommandLineIcon className="w-8 h-8 text-purple-400 mb-3 mx-auto group-hover:scale-110 transition-transform" />
//             <h3 className="font-semibold mb-2 text-white">Code Assistant</h3>
//             <p className="text-sm text-gray-400">Get help with programming and debugging</p>
//           </div>
//           <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/25">
//             <SparklesIcon className="w-8 h-8 text-cyan-400 mb-3 mx-auto group-hover:scale-110 transition-transform" />
//             <h3 className="font-semibold mb-2 text-white">Creative Writing</h3>
//             <p className="text-sm text-gray-400">Generate stories, poems, and creative content</p>
//           </div>
//           <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-pink-500/25">
//             <RocketLaunchIcon className="w-8 h-8 text-pink-400 mb-3 mx-auto group-hover:scale-110 transition-transform" />
//             <h3 className="font-semibold mb-2 text-white">Problem Solving</h3>
//             <p className="text-sm text-gray-400">Analyze complex problems and find solutions</p>
//           </div>
//         </div>

//         {/* 🔧 ENHANCED CTA Button with Loading State */}
//        {/* Enhanced version with more visual states */}
//     <div className="flex justify-center">

//       <button 
//   onClick={handleCreateNewChat}
//   disabled={actionLoading}
//   className={` px-10 py-4 rounded-xl shadow-lg transition-all duration-300 font-semibold text-lg transform flex items-center justify-center min-w-[300px] h-[56px] ${
//     actionLoading 
//       ? 'bg-gradient-to-r from-purple-800 to-cyan-800 cursor-not-allowed scale-[0.98]' 
//       : 'bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 hover:from-purple-700 hover:via-cyan-700 hover:to-purple-700 hover:shadow-purple-500/25 hover:shadow-2xl hover:scale-[1.05] animate-gradient-x bg-[length:200%_200%]'
//   }`}
// >
//   {actionLoading ? (
//     <>
//       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
//       <div className="flex flex-col items-center">
//         <span className="text-sm">Creating...</span>
//         <span className="text-xs opacity-75">Please wait</span>
//       </div>
//     </>
//   ) : (
//     <>
//       <SparklesIcon className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
//       <span>Start Your First Conversation</span>
//     </>
//   )}
//       </button>
//       </div>
//       </div>
//     </section>
//   );
// }

// components/ChatWindow.tsx
"use client";
import React from "react";
import { CommandLineIcon, SparklesIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useChatContext } from "@/Store/ChatContex";
import { APP_NAME } from "@/utils";

export default function ChatWindow() {
  
  const { 
   
    createNewChat, 
    actionLoading,
  } = useChatContext();

  const handleCreateNewChat = async () => {
    try {
      const newChat = await createNewChat("Hello! I'd like to start a new conversation.");
      if (newChat) {
        window.location.href = `/conversation/${newChat._id}`;
      }
    } catch (error) {
      console.error('Failed to create new chat:', error);
    }
  };

  return (
    // 🔧 FIX: Use proper mobile-friendly container classes
    <section className="min-h-screen h-screen max-h-screen overflow-y-auto overflow-x-hidden mobile-scroll relative">
      {/* Animated background grid - FIXED: Allow pointer events to pass through */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none"></div>
      
      {/* 🔧 FIX: Scrollable content container */}
      <div className="relative z-10 min-h-full flex flex-col items-center justify-center py-8 px-4">
        <div className="text-center max-w-2xl mx-auto w-full">
          {/* Main Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-6 sm:mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <SparklesIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white animate-spin-slow" />
            </div>
          </div>

          {/* Main Text - RESPONSIVE */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
            Welcome to  {APP_NAME}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            Experience the future of AI conversation. Start a new chat or select from your previous conversations.
          </p>

          {/* Feature Cards - MOBILE RESPONSIVE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/25">
              <CommandLineIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-1 sm:mb-2 text-white text-sm sm:text-base">Code Assistant</h3>
              <p className="text-xs sm:text-sm text-gray-400">Get help with programming and debugging</p>
            </div>
            <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/25">
              <SparklesIcon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-1 sm:mb-2 text-white text-sm sm:text-base">Creative Writing</h3>
              <p className="text-xs sm:text-sm text-gray-400">Generate stories, poems, and creative content</p>
            </div>
            <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-pink-500/25 sm:col-span-2 lg:col-span-1">
              <RocketLaunchIcon className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-1 sm:mb-2 text-white text-sm sm:text-base">Problem Solving</h3>
              <p className="text-xs sm:text-sm text-gray-400">Analyze complex problems and find solutions</p>
            </div>
          </div>

          {/* CTA Button - MOBILE OPTIMIZED */}
          <div className="flex justify-center">
            <button 
              onClick={handleCreateNewChat}
              disabled={actionLoading}
              className={`px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg transition-all duration-300 font-semibold text-base sm:text-lg transform flex items-center justify-center w-full sm:min-w-[300px] sm:w-auto h-[50px] sm:h-[56px] ${
                actionLoading 
                  ? 'bg-gradient-to-r from-purple-800 to-cyan-800 cursor-not-allowed scale-[0.98]' 
                  : 'bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 hover:from-purple-700 hover:via-cyan-700 hover:to-purple-700 hover:shadow-purple-500/25 hover:shadow-2xl hover:scale-[1.05] animate-gradient-x bg-[length:200%_200%]'
              }`}
            >
              {actionLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-3"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm">Creating...</span>
                    <span className="text-xs opacity-75 hidden sm:block">Please wait</span>
                  </div>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  <span className="truncate">Start Your First Conversation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

