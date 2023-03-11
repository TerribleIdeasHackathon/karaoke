import Header from '@/components/Header';
import { Box, Container, Flex, FormErrorIcon, IconButton, Text } from '@chakra-ui/react';
import { useState } from 'react';
import KaraokeLyricsCard from '@/components/KaraokeLyricsCard';
import { KaraokeResponse } from '@/models/karaokeResponse';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function Karaoke() {
  const [karaokeResponse, setKaraokeResponse] = useState<KaraokeResponse>({
    lyrics: [{ timestampMs: 0, lyric: 'Test' }],
    artist: 'Rick Astley',
    songName: 'Never gonna give you up',
  });

  const [currentLine, setCurrentLine] = useState<string>('');

  return (
    <Box>
      <Header>
        <Link href="/">
          <IconButton aria-label="Go back to home" title="Go back to home" icon={<ArrowBackIcon />} />
        </Link>
      </Header>
      <Container pt={10}>
        <Flex direction="column" gap={10}>
          <Flex direction="row" gap={2}>
            <Text fontWeight="bold">{karaokeResponse.songName}</Text>
            <Text>{karaokeResponse.artist}</Text>
          </Flex>
          <KaraokeLyricsCard>
            <Text>Test</Text>
            <Text color="gray.500">Next lines</Text>
          </KaraokeLyricsCard>
        </Flex>
      </Container>
    </Box>
  );
}
