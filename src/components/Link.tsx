"use client";

import React from 'react';
import { Link as VikeLink } from 'vike-react/Link';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Link = ({ to, children, className, onClick }: LinkProps) => {
  return (
    <VikeLink to={to} className={className} onClick={onClick}>
      {children}
    </VikeLink>
  );
};

export default Link;