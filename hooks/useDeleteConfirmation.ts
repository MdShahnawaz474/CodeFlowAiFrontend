// hooks/useDeleteConfirmation.ts
"use client";
import { useState } from 'react';

interface DeleteConfirmationState {
  isOpen: boolean;
  title: string;
  message: string;
  itemName: string;
  onConfirm: () => void;
}

export const useDeleteConfirmation = () => {
  const [state, setState] = useState<DeleteConfirmationState>({
    isOpen: false,
    title: '',
    message: '',
    itemName: '',
    onConfirm: () => {},
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const showConfirmation = ({
    title,
    message,
    itemName,
    onConfirm,
  }: Omit<DeleteConfirmationState, 'isOpen'>) => {
    setState({
      isOpen: true,
      title,
      message,
      itemName,
      onConfirm,
    });
  };

  const hideConfirmation = () => {
    if (!isDeleting) {
      setState(prev => ({ ...prev, isOpen: false }));
    }
  };

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await state.onConfirm();
      hideConfirmation();
    } catch (error) {
      console.error('Delete operation failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    ...state,
    isDeleting,
    showConfirmation,
    hideConfirmation,
    handleConfirm,
  };
};
