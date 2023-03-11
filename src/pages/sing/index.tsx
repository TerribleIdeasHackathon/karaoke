import { Container, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import KaraokeLyricsCard from '../../components/KaraokeLyricsCard';
import { KaraokeResponse } from '../../models/karaokeResponse';

export default function Karaoke() {
  const [karaokeResponse, setKaraokeResponse] = useState<KaraokeResponse>({
    lyrics: [{ timestampMs: 0, lyric: 'Test' }],
    artist: 'Rick Astley',
    songName: 'Never gonna give you up',
  });

  return (
    <Container>
      <Flex direction="row" gap={2}>
        <Text fontWeight="bold">{karaokeResponse.songName}</Text>
        <Text>{karaokeResponse.artist}</Text>
      </Flex>
      <KaraokeLyricsCard>Test</KaraokeLyricsCard>
    </Container>
  );
}
