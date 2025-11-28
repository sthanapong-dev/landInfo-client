"use client";

import { useDropdown } from './DropdownContext';

interface DropdownTriggerProps {
  children: React.ReactNode;
}

export default function DropdownTrigger({ children }: DropdownTriggerProps) {
  const { toggleDropdown } = useDropdown();

  return (
    <div onClick={toggleDropdown} className="cursor-pointer">
      {children}
    </div>
  );
}