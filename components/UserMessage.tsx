// // components/UserMessage.tsx
// import React from 'react';
// import { UserCircleIcon } from '@heroicons/react/24/outline';
// import { Message } from '@/types/conversation';

// interface UserMessageProps {
//   message: Message;
// }

// export default function UserMessage({ message }: UserMessageProps) {
//   return (
//     <div className="flex items-start space-x-3 justify-end">
//       <div className="max-w-3xl">
//         <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-4 rounded-2xl rounded-tr-md shadow-lg">
//           <p className="whitespace-pre-wrap">{message.content}</p>
//         </div>
//         {message.timestamp && (
//           <div className="text-xs text-gray-500 mt-1 text-right">
//             {new Date(message.timestamp).toLocaleTimeString()}
//           </div>
//         )}
//       </div>
//       <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
//         <UserCircleIcon className="w-5 h-5 text-white" />
//       </div>
//     </div>
//   );
// }
// components/UserMessage.tsx
import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Message } from '@/types/conversation';

interface UserMessageProps {
  message: Message;
}

export default function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex items-start space-x-3 justify-end max-w-6xl">
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-4 rounded-2xl rounded-tr-md shadow-lg max-w-3xl">
        <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
      </div>
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
        <UserCircleIcon className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}

