import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:pointer-events-none select-none';

    const variants = {
      primary: 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm border border-orange-600',
      secondary: 'bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 shadow-sm',
      outline: 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-300',
      ghost: 'bg-transparent hover:bg-stone-100 text-stone-600 hover:text-stone-900',
      danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm border border-red-600',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-9 px-4 text-sm',
      lg: 'h-11 px-6 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
