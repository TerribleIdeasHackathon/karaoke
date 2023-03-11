import { Box, Spinner, Center, Text, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import SongSelectCard from './SongSelectCard';

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
    <SongSelectCard minHeight="220px">
      <Flex gap={5} alignItems="center">
        <Spinner className="spinner" size="xl" color="white" thickness="5px" speed="2s" />
        <Text fontWeight="bold" fontSize="4xl">
          Loading...
        </Text>
      </Flex>
      <Text textAlign="center" p={3} flexGrow="1">
        {quote}
      </Text>
    </SongSelectCard>
  );
}
