import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Spinner, Center, Text, Flex, Link, IconButton } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Card from './Card';
import Header from './Header';

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
    <>
      <Header>
        <Link href="/">
          <IconButton aria-label="Go back to home" title="Go back to home" icon={<ArrowBackIcon />} />
        </Link>
      </Header>
      <Box>
        <Center>
          <Card minHeight="250px" width={'600px'}>
            <Flex pt={8} gap={5} alignItems="center">
              <Spinner className="spinner" size="xl" color="white" thickness="5px" speed="2s" />
              <Text fontWeight="bold" fontSize="4xl">
                Loading...
              </Text>
            </Flex>
            <Text textAlign="center" p={3} flexGrow="1">
              {quote}
            </Text>
          </Card>
        </Center>
      </Box>
    </>
  );
}
