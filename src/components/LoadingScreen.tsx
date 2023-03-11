import { Box } from '@chakra-ui/react';
import { Spinner, Center, Text } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { quotes } from './quotes';
import '../styles/LoadingScreen.module.css';

export default function LoadingScreen() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const quote = quotes[quoteIdx];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((quoteIdx) => (quoteIdx + 1) % quotes.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box>
      <Center color="red.100">
        {' '}
        <Spinner className="spinner" size="xl" color="red.500" speed="2s" variant="bold" p={3}></Spinner>
      </Center>

      <div>
        <Text color="red.500" p={3} onClick={() => {}}>
          {quote}
        </Text>
      </div>
    </Box>
  );
}
