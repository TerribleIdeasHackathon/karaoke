import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Container, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import Card from './Card';
import SongMetadata, { SongMetadataProps } from './SongMetadata';

interface StartMusicScreenProps extends SongMetadataProps {
  startMusic: () => void;
}

export default function StartMusicScreen({ startMusic, ...songMetadataProps }: StartMusicScreenProps) {
  return (
    <Container maxW="2xl">
      <Card alignItems="flex-start">
        <SongMetadata {...songMetadataProps} />
        <Text>Your song has been loaded and is now ready to roll!</Text>
        <Button width="full" rightIcon={<ArrowForwardIcon />} onClick={startMusic}>
          Get Started
        </Button>
        <Text fontSize="sm">
          Not the right song? You can go{' '}
          <Link href="/songSelect">
            <Button size="sm" variant="link" colorScheme="pink" color="#ef3499">
              back
            </Button>
          </Link>
          .
        </Text>
      </Card>
    </Container>
  );
}
