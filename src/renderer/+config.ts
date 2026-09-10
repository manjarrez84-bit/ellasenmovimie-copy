import type { Config } from 'vike/types';

// https://vike.dev/config
export default {
  passToClient: ['pageProps', 'routeParams'],
  clientRouting: true,
  hydrationCanBeAborted: true,
  extends: 'vike-react/config', // This is the correct string literal for extending vike-react
}; // Removed 'satisfies Config' for troubleshooting