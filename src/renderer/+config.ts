import type { Config } from 'vike/types';

// https://vike.dev/config
export default {
  passToClient: ['pageProps', 'routeParams'],
  clientRouting: true,
  hydrationCanBeAborted: true,
  extends: 'vike-react', // Corrected to use 'vike-react'
} satisfies Config;