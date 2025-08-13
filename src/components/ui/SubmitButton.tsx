'use client'

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Spinner } from './Spinner';

interface SubmitButtonProps {
  children?: React.ReactNode;
  loadingText?: string;
  className?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  children = 'Odeslat',
  loadingText = 'Odesílání...',
  className = ''
}) => {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-12 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 shadow-sm hover:shadow-xl hover:shadow-gray-900/25 transition-all duration-300 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:shadow-sm ${className}`}
    >
      {pending ? (
        <span className="flex items-center justify-center">
          <Spinner className="-ml-1 mr-3 text-white" size="md" />
          {loadingText}
        </span>
      ) : children}
    </button>
  );
};