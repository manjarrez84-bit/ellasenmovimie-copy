import type { Config } from 'vike/types';
import vikeReact from 'vike-react/config'; // Import the vike-react config object

// https://vike.dev/config
export default {
  extends: vikeReact, // Correctly extend the imported vikeReact config
  passToClient: ['pageProps', 'routeParams'],
  clientRouting: true,
  hydrationCanBeAborted: true,
} satisfies Config;