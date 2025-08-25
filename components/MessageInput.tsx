// // components/MessageInput.tsx
// "use client";
// import React, { useState } from 'react';
// import { PaperAirplaneIcon, MicrophoneIcon } from '@heroicons/react/24/outline';

// interface MessageInputProps {
//   onSendMessage: (message: string) => Promise<void>;
//   loading?: boolean;
// }

// export default function MessageInput({ onSendMessage, loading = false }: MessageInputProps) {
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
//     e.preventDefault();
//     if (!message.trim() || loading) return;

//     const currentMessage = message;
//     setMessage(''); // Clear immediately
    
//     try {
//       await onSendMessage(currentMessage);
//     } catch (error) {
//         console.error(error);
//       setMessage(currentMessage); 
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   return (
//     <div className="p-4">
//       <form onSubmit={handleSubmit} className="flex items-end space-x-3">
//         <div className="flex-1 relative">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type your message... (Shift+Enter for new line)"
//             disabled={loading}
//             rows={1}
//             className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none max-h-32"
//             style={{ minHeight: '48px' }}
//           />
//           <button
//             type="button"
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
//           >
//             <MicrophoneIcon className="w-5 h-5" />
//           </button>
//         </div>
//         <button
//           type="submit"
//           disabled={loading || !message.trim()}
//           className="p-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all flex items-center justify-center shadow-lg hover:shadow-purple-500/25"
//         >
//           {loading ? (
//             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//           ) : (
//             <PaperAirplaneIcon className="w-5 h-5 text-white" />
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }

// components/MessageInput.tsx
"use client";
import React, { useState, useRef} from 'react';
import { PaperAirplaneIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import TextareaAutosize from 'react-textarea-autosize';
import "@/app/globals.css";

interface MessageInputProps {
  onSendMessage: (message: string) => Promise<void>;
  loading?: boolean;
}

export default function MessageInput({ onSendMessage, loading = false }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!message.trim() || loading) return;

  //   const currentMessage = message;
  //   setMessage(''); // Clear immediately
    
  //   try {
  //     await onSendMessage(currentMessage);
  //   } catch (error) {
  //     console.error(error);
  //     setMessage(currentMessage); // Restore on error
  //   }
  // };

  const handleSubmit = async () => {
  if (!message.trim() || loading) return;

  const currentMessage = message;
  setMessage(''); // Clear immediately

  try {
    await onSendMessage(currentMessage);
  } catch (error) {
    console.error(error);
    setMessage(currentMessage); // Restore on error
  }
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <TextareaAutosize
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Shift+Enter for new line)"
            disabled={loading}
            minRows={1}           // ✅ Use minRows to set minimum height
            maxRows={5}           // ✅ Limits to 2 lines like ChatGPT
            maxLength={4000}      // Optional character limit
            // className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
            className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none overflow-y-auto scrollbar-custom" 
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
            disabled={loading}
          >
            <MicrophoneIcon className="w-5 h-5" />
          </button>
        </div>
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="p-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all flex items-center justify-center shadow-lg hover:shadow-purple-500/25"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <PaperAirplaneIcon className="w-5 h-5 text-white" />
          )}
        </button>
      </form>
    </div>
  );
}
