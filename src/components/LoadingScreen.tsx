import { Box, Spinner, Center, Text, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const quotes = [
  'You stink!',
  'Abandon all hope, ye who enter here! Our loading screen is the harbinger of doom and despair.',
  'Enter at your own risk! Our loading screen is not for the weak-minded or faint of heart!',
  'You think you are tough enough for this game? Our loading screen will make you rethink your entire existence!',
  'Welcome to the world of loading screens, where your impatience and frustration will be put to the ultimate test!',
];

export default function LoadingScreen() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const quote = quotes[quoteIdx];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((quoteIdx) => (quoteIdx + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box py={10}>
      <Center color="red.100" flexDirection="column">
        <Flex gap={4} alignItems="center">
          <Spinner className="spinner" size="xl" color="#ef3499" thickness="5px" speed="2s" />
          <Text fontWeight="bold" fontSize="4xl">
            Loading...
          </Text>
        </Flex>
        <Text color="red.500" p={3}>
          {quote}
        </Text>
      </Center>
    </Box>
  );
}
