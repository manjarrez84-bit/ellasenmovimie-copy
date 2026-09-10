import type {
  PageContextBuiltIn,
} from 'vike/types';
import type React from 'react';

type Page = React.ComponentType<PageProps>; // Correctly define Page as a React component type
type PageProps = Record<string, unknown>;

export type PageContext = PageContextBuiltIn<Page> & {
  Page: Page; // The React component rendered by the page
  pageProps?: PageProps; // Props passed to the Page component
  routeParams: Record<string, string>; // Parameters from the route
};