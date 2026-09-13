import React from 'react';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Link = ({ to, children, className, onClick }: LinkProps) => {
  return (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  );
};

export default Link;