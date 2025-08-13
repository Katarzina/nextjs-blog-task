import React, { memo } from 'react';

interface ErrorMessageProps {
  id?: string;
  error?: string | string[];
  className?: string;
}

export const ErrorMessage = memo<ErrorMessageProps>(({ 
  id,
  error,
  className = ''
}) => {
  if (!error) return null;
  
  const errorText = Array.isArray(error) ? error[0] : error;
  
  return (
    <p 
      id={id}
      className={`text-red-500 text-xs mt-1 ${className}`}
      role="alert"
    >
      {errorText}
    </p>
  );
});

ErrorMessage.displayName = 'ErrorMessage';