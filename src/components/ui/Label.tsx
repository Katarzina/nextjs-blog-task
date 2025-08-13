import React, { memo } from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

export const Label = memo<LabelProps>(({ 
  children, 
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <label 
      className={`block text-black mb-2 ${className}`}
      style={{ fontSize: '14px' }}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
});

Label.displayName = 'Label';