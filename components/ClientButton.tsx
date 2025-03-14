"use client";

import React from 'react';

interface ClientButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

const ClientButton: React.FC<ClientButtonProps> = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default ClientButton;
