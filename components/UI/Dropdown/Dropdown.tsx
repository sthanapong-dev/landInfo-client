"use client";

import { DropdownProvider } from './DropdownContext';

interface DropdownProps {
  children: React.ReactNode;
  color?: string;
  variant?: string;
}

export default function Dropdown({ children, color, variant }: DropdownProps) {
  return (
    <DropdownProvider color={color} variant={variant}>
      {children}
    </DropdownProvider>
  );
}
