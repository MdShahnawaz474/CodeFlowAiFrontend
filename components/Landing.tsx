// app/page.tsx
"use client";
import React, { useEffect } from 'react';
import { 
  SparklesIcon, 
  BoltIcon, 
  CodeBracketIcon, 
  ChatBubbleLeftRightIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/utils';

export default function LandingPage() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/chat");
    }
  }, [router]);

  const handleGetStarted = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
          <div className="absolute top-1/4 left-1/2 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-1000"></div>
    <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-3000"></div>
    <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-5000"></div>
    <div className="absolute bottom-0 right-1/2 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-7000"></div>
        
      
        </div>
      </div>

      {/* Navigation */}
<nav className="fixed top-0 left-0 w-full z-50 p-2 backdrop-blur-lg bg-white/5 border-b border-white/10">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
        <SparklesIcon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        {APP_NAME}
        </h1>
      </div>
    </div>
    <div className="hidden md:flex items-center space-x-8">
      <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
      <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
      <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
      <button 
        onClick={handleGetStarted}
        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg transition-all transform hover:scale-105"
      >
        Get Started
      </button>
    </div>
  </div>
</nav>


      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full">
            <BoltIcon className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-300">Powered by Advanced AI Technology</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]">
              The Future of
            </span>
            <br />
            <span className="text-white">AI Conversations</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience the next generation of AI with {APP_NAME} From creative writing to code assistance, 
            unlock unlimited possibilities with our advanced conversational AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button 
              onClick={handleGetStarted}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 hover:from-purple-700 hover:via-cyan-700 hover:to-purple-700 rounded-xl shadow-lg transition-all duration-300 font-semibold text-lg hover:shadow-purple-500/25 hover:shadow-2xl transform hover:scale-[1.05] animate-gradient-x bg-[length:200%_200%] flex items-center cursor-pointer"
            >
              Start Chatting Now
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all duration-300 font-semibold text-lg">
              Watch Demo
            </button>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mock Chat Bubbles */}
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-2xl p-4 text-left">
                    <div className="text-sm text-gray-400 mb-2">You</div>
                    <div className="text-white">Create a futuristic logo for my startup</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-2xl p-4 text-left">
                    <div className="text-sm text-purple-300 mb-2">Gemini AI</div>
                    <div className="text-white">I&apos;d love to help you create a futuristic logo! Let me suggest some modern design concepts...</div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center animate-pulse">
                    <SparklesIcon className="w-16 h-16 text-white animate-spin-slow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover what makes {APP_NAME} the most advanced conversational AI platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 backdrop-blur-lg bg-white/5 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02]">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CodeBracketIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Code Assistant</h3>
              <p className="text-gray-300 leading-relaxed">
                Get instant help with programming, debugging, and code optimization. Support for all major programming languages.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 backdrop-blur-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-[1.02]">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Natural Conversations</h3>
              <p className="text-gray-300 leading-relaxed">
                Engage in human-like conversations with context awareness and memory across multiple chat sessions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 backdrop-blur-lg bg-white/5 border border-white/10 hover:border-pink-500/50 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25 transform hover:scale-[1.02]">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <RocketLaunchIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Lightning Fast</h3>
              <p className="text-gray-300 leading-relaxed">
                Experience blazing-fast responses with our optimized AI models and advanced infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Start free and upgrade as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
              <div className="text-4xl font-bold mb-6 text-white">$0<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  10 conversations/month
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  Basic AI model
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  Email support
                </li>
              </ul>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 backdrop-blur-lg bg-gradient-to-b from-purple-500/20 to-cyan-500/20 border border-purple-500/50 rounded-2xl relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
              <div className="text-4xl font-bold mb-6 text-white">$19<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  Unlimited conversations
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  Advanced AI models
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  Priority support
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  Custom integrations
                </li>
              </ul>
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg transition-all">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2 text-white">Enterprise</h3>
              <div className="text-4xl font-bold mb-6 text-white">Custom</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  Everything in Pro
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  Dedicated support
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  Custom AI training
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  SLA guarantee
                </li>
              </ul>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
             {APP_NAME}
            </span>
          </div>
          <p className="text-gray-400 mb-6">The future of AI conversations, today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-gray-500">
            © 2025 Gemini AI. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
