import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  error = false,
  className = '',
  ...props 
}) => {
  return (
    <input
      className={`w-full px-3 py-2 focus:outline-none text-base text-gray-900 rounded form-input-white ${
        error ? 'border-red-500' : ''
      } ${className}`}
      style={{ border: `1px solid ${error ? '#ef4444' : 'var(--color-light-gray)'}` }}
      {...props}
    />
  );
};