import type {
  PageContextBuiltIn,
  PageContextBuiltInClient,
  PageContextServer,
} from 'vike/types';
import type React from 'react';

type Page = (pageProps: PageProps) => React.ReactElement;
type PageProps = Record<string, unknown>;

export type PageContext = PageContextBuiltIn<Page> &
  PageContextBuiltInClient<Page> &
  PageContextServer & {
    pageProps: PageProps;
  };