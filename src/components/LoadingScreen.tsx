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
  'Remember, switching to your secondary is faster than reloading.',
  'Lorem Ipsum',
  'Be wary of the Cotten Eye Joe',
  'Warming up our vocal chords...',
  'Finding the perfect song to match your voice...',
  'Loading the lyrics, please hold...',
  'Preparing to take center stage...',
  "We're tuning up our sound system, it won't be long now...",
  'Creating your perfect karaoke experience...',
  'Practicing our own singing skills while you wait...',
  "Grab some water and take a break, we'll be ready soon...",
  'Our team of AI musicians are preparing to accompany you...',
  'Cueing up the music and lyrics, stay tuned...',
  'Ready to belt out your favorite tunes? We are too!',
  'Singing in the shower is great, but karaoke is even better!',
  "We're working hard to make your karaoke dreams come true...",
  "We're almost ready to put you in the spotlight...",
  'Karaoke night just got better with our AI technology.',
  'Just a moment... or maybe two... or three...',
  'Hold on tight, this may take a while.',
  'Loading... loading... still loading...',
  'Our hamsters are running as fast as they can!',
  'Please wait while we summon the loading spirits.',
  'Loading... because patience is a virtue, apparently.',
  'We apologize for the delay, blame the slow internet.',
  'Loading... please entertain yourself while we wait.',
  'Sit back, relax, and enjoy the wait... or not.',
  'Loading... because time is a construct anyway.',
  'Counting to infinity... or at least it feels like it.',
  "We'll be right back... eventually.",
  "We're chugging along, just like that little engine that could.",
  'Loading... because staring at a blank screen is fun, right?',
];

export default function LoadingScreen() {
  const [quoteIdx, setQuoteIdx] = useState(Math.floor(Math.random() * quotes.length));
  const quote = quotes[quoteIdx];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((quoteIdx) => Math.floor(Math.random() * quotes.length));
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
