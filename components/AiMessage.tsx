// components/AIMessage.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SparklesIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { Message } from '@/types/conversation';
import {ComponentProps,CodeProps} from '@/types/conversation';
interface AIMessageProps {
  message: Message;
}

export default function AIMessage({ message }: AIMessageProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex items-start space-x-3 max-w-4xl">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
        <SparklesIcon className="w-5 h-5 text-white" />
      </div>
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 text-white p-4 rounded-2xl rounded-tl-md shadow-lg flex-1 min-w-0">
        <ReactMarkdown
          components={{
            // ✅ Fix: Use proper TypeScript types with destructuring
            code({  inline, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              
              if (!inline && match) {
                return (
                  <div className="relative group">
                    <div className="flex items-center justify-between bg-gray-800/50 px-4 py-2 text-xs text-gray-300 border-b border-gray-600/50 rounded-t-lg">
                      <span className="font-mono">{language}</span>
                      <button
                        onClick={() => copyToClipboard(String(children).replace(/\n$/, ''))}
                        className="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity p-1 hover:bg-gray-700 rounded"
                      >
                        <ClipboardIcon className="w-4 h-4 hover:cursor-pointer" />
                      </button>
                    </div>
                    <SyntaxHighlighter
                    //   style={oneDark as any} // ✅ Fix: Cast to any to avoid style type conflict
                    style={oneDark as unknown as { [key: string]: React.CSSProperties }}
                      language={language}
                      PreTag="div"
                      className="!mt-0 !rounded-t-none !bg-gray-900"
                      customStyle={{
                        margin: 0,
                        borderRadius: '0 0 0.5rem 0.5rem',
                        fontSize: '0.875rem',
                      }}
                      {...props} // ✅ Fix: Spread remaining props (excluding style, ref)
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                );
              }
              
              // Inline code
              return (
                <code 
                  className="bg-gray-700/50 px-2 py-1 rounded text-cyan-300 text-sm font-mono" 
                  {...props}
                >
                  {children}
                </code>
              );
            },
            
            // ✅ Fix: Proper paragraph styling
            p({ children }: ComponentProps) {
              return <p className="mb-4 last:mb-0 leading-relaxed text-gray-100">{children}</p>;
            },
            
            // ✅ Fix: Better list styling
            ul({ children }: ComponentProps) {
              return <ul className="list-disc list-inside mb-4 space-y-2 text-gray-100 ml-4">{children}</ul>;
            },
            
            ol({ children }: ComponentProps) {
              return <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-100 ml-4">{children}</ol>;
            },
            
            li({ children }: ComponentProps) {
              return <li className="text-gray-100">{children}</li>;
            },
            
            // ✅ Fix: Header styling
            h1({ children }: ComponentProps) {
              return <h1 className="text-xl font-bold mb-4 text-white border-b border-gray-600 pb-2">{children}</h1>;
            },
            
            h2({ children }: ComponentProps) {
              return <h2 className="text-lg font-bold mb-3 text-white">{children}</h2>;
            },
            
            h3({ children }: ComponentProps) {
              return <h3 className="text-base font-bold mb-2 text-white">{children}</h3>;
            },
            
            // ✅ Fix: Link styling
            a({ children, href }: ComponentProps) {
              return (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline hover:no-underline transition-colors"
                >
                  {children}
                </a>
              );
            },
            
            // ✅ Fix: Blockquote styling
            blockquote({ children }: ComponentProps) {
              return (
                <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-gray-800/30 rounded-r-lg italic text-gray-300">
                  {children}
                </blockquote>
              );
            },

            // ✅ Fix: Table styling (if needed)
            table({ children }: ComponentProps) {
              return <table className="min-w-full border-collapse border border-gray-600 my-4">{children}</table>;
            },
            
            th({ children }: ComponentProps) {
              return <th className="border border-gray-600 px-4 py-2 bg-gray-800 text-white font-semibold">{children}</th>;
            },
            
            td({ children }: ComponentProps) {
              return <td className="border border-gray-600 px-4 py-2 text-gray-100">{children}</td>;
            },
            
            // ✅ Fix: Strong and emphasis
            strong({ children }: ComponentProps) {
              return <strong className="font-bold text-white">{children}</strong>;
            },
            
            em({ children }: ComponentProps) {
              return <em className="italic text-gray-200">{children}</em>;
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
