declare module 'vike-react/entry' {
  import { ReactNode } from 'react';
  export function render(): void;
  export function createApp(): { ReactElement: ReactNode };
}

declare module 'vike-react/Link' {
  import { ReactNode } from 'react';
  interface LinkProps {
    to: string;
    children: ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }
  const Link: React.FC<LinkProps>;
  export default Link;
  export { Link };
}

declare module 'vike-react/usePageContext' {
  import { usePageContext } from 'vike-react/usePageContext';
  interface PageContext {
    urlPathname: string;
    routeParams: Record<string, string>;
    router: {
      navigate: (path: string) => void;
    };
  }
  function usePageContext(): PageContext;
  export { usePageContext };
}

declare module 'vike-react/plugin' {
  import { Plugin } from 'vite';
  function vikeReact(): Plugin;
  export default vikeReact;
}