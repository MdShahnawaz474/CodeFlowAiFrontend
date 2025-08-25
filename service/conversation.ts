// services/conversationService.ts
import { apiClient } from '@/lib/axios';
import { Conversation, NewConversationRequest, NewMessageRequest } from '@/types/conversation';

export class ConversationService {
  
  // Create new conversation
  static async createConversation(data: NewConversationRequest): Promise<Conversation> {
    try {
      return await apiClient.post<Conversation>('/conversations', data);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to create conversation');
    }
  }

  // Add new message to existing conversation
  static async addMessage(conversationId: string, data: NewMessageRequest): Promise<Conversation> {
    try {
      return await apiClient.put<Conversation>(`/conversations/${conversationId}`, data);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to add message');
    }
  }

  // Get all conversations
  static async getAllConversations(): Promise<Conversation[]> {
    try {
      return await apiClient.get<Conversation[]>('/conversations');
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch conversations');
    }
  }

  // Delete conversation
  static async deleteConversation(conversationId: string): Promise<{ message: string }> {
    try {
      return await apiClient.delete<{ message: string }>(`/conversations/${conversationId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to delete conversation');
    }
  }

  // Get single conversation
  static async getConversation(conversationId: string): Promise<Conversation> {
    try {
      return await apiClient.get<Conversation>(`/conversations/${conversationId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch conversation');
    }
  }
}
