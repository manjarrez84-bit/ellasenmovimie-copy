"use client";

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Link = ({ to, children, className, onClick }: LinkProps) => {
  return (
    <RouterLink to={to} className={className} onClick={onClick}>
      {children}
    </RouterLink>
  );
};

export default Link;