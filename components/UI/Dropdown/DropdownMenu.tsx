"use client";

import { useDropdown } from './DropdownContext';

interface DropdownMenuProps {
  children: React.ReactNode;
  'aria-label'?: string;
  color?: string;
  variant?: string;
  className?: string;
}

export default function DropdownMenu({ 
  children, 
  'aria-label': ariaLabel,
  color: menuColor,
  variant: menuVariant,
  className = ''
}: DropdownMenuProps) {
  const { isOpen, color: contextColor, variant: contextVariant } = useDropdown();

  const finalColor = menuColor || contextColor || 'default';
  const finalVariant = menuVariant || contextVariant || 'solid';

  if (!isOpen) return null;

  const colorClasses = {
    default: 'bg-white border-gray-200',
    primary: 'bg-blue-50 border-blue-200',
    secondary: 'bg-purple-50 border-purple-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    danger: 'bg-red-50 border-red-200',
  };

  const bgClass = colorClasses[finalColor as keyof typeof colorClasses] || colorClasses.default;

  return (
    <div
      role="menu"
      aria-label={ariaLabel}
      className={`absolute top-full left-0 mt-2 min-w-[200px] ${bgClass} border rounded-lg shadow-lg z-50 py-1 ${className}`}
    >
      {children}
    </div>
  );
}
