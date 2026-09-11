declare module 'vike-react/Link' {
  import React from 'react';
  
  interface LinkProps {
    to: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }
  
  const Link: React.FC<LinkProps>;
  export default Link;
}

declare module 'vike-react/usePageContext' {
  import { usePageContext as usePageContextImpl } from 'vike/types';
  export default usePageContextImpl;
}