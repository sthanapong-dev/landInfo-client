"use client";

import { useDropdown } from './DropdownContext';

interface DropdownItemProps {
  children: React.ReactNode;
  key?: string;
  onClick?: () => void;
  className?: string;
  color?: string;
}

export default function DropdownItem({ 
  children, 
  onClick,
  className = '',
  color
}: DropdownItemProps) {
  const { closeDropdown } = useDropdown();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    closeDropdown();
  };

  const colorClasses = {
    default: 'hover:bg-gray-100 text-gray-900',
    primary: 'hover:bg-blue-100 text-blue-900',
    secondary: 'hover:bg-purple-100 text-purple-900',
    success: 'hover:bg-green-100 text-green-900',
    warning: 'hover:bg-yellow-100 text-yellow-900',
    danger: 'hover:bg-red-100 text-red-600',
  };

  const itemClass = color 
    ? colorClasses[color as keyof typeof colorClasses] || colorClasses.default
    : colorClasses.default;

  return (
    <div
      role="menuitem"
      onClick={handleClick}
      className={`px-4 py-2 cursor-pointer transition-colors ${itemClass} ${className}`}
    >
      {children}
    </div>
  );
}
