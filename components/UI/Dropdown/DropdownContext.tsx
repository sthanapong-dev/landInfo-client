"use client";

import { createContext, useContext, useState, useRef, useEffect } from 'react';

interface DropdownContextType {
  isOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  color?: string;
  variant?: string;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown');
  }
  return context;
};

interface DropdownProviderProps {
  children: React.ReactNode;
  color?: string;
  variant?: string;
}

export const DropdownProvider = ({ children, color, variant }: DropdownProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown, closeDropdown, color, variant }}>
      <div ref={dropdownRef} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};
