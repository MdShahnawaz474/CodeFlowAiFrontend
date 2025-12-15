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

// types/conversation.ts
export interface ChatContextType {
  chats: Conversation[];
  loading: boolean;
  error: string | null;
  actionLoading: boolean;  // For message sending
  createLoading: boolean;  
  deleteLoading: boolean;  
  
  createNewChat: (prompt: string, model?: string) => Promise<Conversation>;
  sendMessage: (chatId: string, prompt: string) => Promise<Conversation>;
  deleteChat: (chatId: string) => Promise<void>;
  refreshChats: () => Promise<void>;
  clearError: () => void;
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
