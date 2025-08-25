// types/conversation.ts
export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export interface Conversation {
  _id: string;
  title: string;
  model: string;
  messages: Message[];
  createdAt?: Date;
  updatedAt?: Date;
  startTime?: string;
}

export interface NewConversationRequest {
  prompt: string;
  model: string;
}

export interface NewMessageRequest {
  prompt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ChatContextType {
  // State
  chats: Conversation[];
  loading: boolean;
  error: string | null;
  actionLoading: boolean; // ✅ Add this

  // Basic Actions
  addChats: (chat: Conversation) => void;
  updateChat: (updatedChat: Conversation) => void;
  deleteChat: (chatId: string) => Promise<void>;
  refreshChats: () => Promise<void>;
  clearError: () => void;

  // ✅ Add these new functions
  createNewChat: (prompt: string, model?: string) => Promise<Conversation>;
  sendMessage: (chatId: string, prompt: string) => Promise<Conversation>;
  getChatById: (chatId: string) => Conversation | undefined;
}

export interface AIMessageProps {
  message: Message;
}

export interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: any;
  ref?: any;
}

export interface ComponentProps {
  children?: React.ReactNode;
  href?: string;
}
