import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({ 
  error = false,
  className = '',
  ...props 
}) => {
  return (
    <textarea
      className={`w-full px-3 py-2 focus:outline-none text-base text-gray-900 resize-none rounded form-input-white ${
        error ? 'border-red-500' : ''
      } ${className}`}
      style={{ border: `1px solid ${error ? '#ef4444' : 'var(--color-light-gray)'}` }}
      {...props}
    />
  );
};