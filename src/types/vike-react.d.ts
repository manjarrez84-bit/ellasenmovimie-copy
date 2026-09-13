declare module 'vike-react/entry' {
  import { ReactNode } from 'react';
  export function render(): void;
  export function createApp(): { ReactElement: ReactNode };
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