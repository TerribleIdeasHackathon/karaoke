import '@/styles/globals.css';
import theme from '@/themes/theme';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default App;
