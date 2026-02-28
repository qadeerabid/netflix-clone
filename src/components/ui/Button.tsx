'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
}

const variants = {
  primary: 'bg-netflix-red hover:bg-red-700 text-white',
  secondary: 'bg-white hover:bg-gray-200 text-black',
  ghost: 'bg-gray-600/70 hover:bg-gray-500/70 text-white',
  danger: 'bg-red-800 hover:bg-red-900 text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-2 text-base',
  lg: 'px-8 py-3 text-lg',
};

export function Button({ variant = 'primary', size = 'md', children, isLoading, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={classNames(
        'inline-flex items-center justify-center gap-2 font-semibold rounded transition-colors duration-200',
        variants[variant],
        sizes[size],
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
