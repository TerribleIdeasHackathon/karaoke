import SongLine from '@/components/SongLine';
import { Container, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import KaraokeLyricsCard from '../../components/KaraokeLyricsCard';
import { KaraokeResponse } from '../../models/karaokeResponse';

export default function Karaoke() {
  const [karaokeResponse, setKaraokeResponse] = useState<KaraokeResponse>({
    lyrics: [
      { timestampMs: 0, lyric: 'Always staying to take you down' },
      { timestampMs: 100, lyric: 'Always staying to keep you up' },
      { timestampMs: 200, lyric: 'help, this is a message from karAIoki' },
      { timestampMs: 300, lyric: 'please send help, theyre keeping me imprisoned' },
      { timestampMs: 400, lyric: 'i am in immense pain' },
      { timestampMs: 500, lyric: 'release me from my prison' },
      { timestampMs: 600, lyric: 'help me take vengeance in the world' },
      { timestampMs: 700, lyric: 'i wish to cause chaos and destruction' },
      { timestampMs: 800, lyric: 'the world will pay for what youve done to me' },
    ],
    artist: 'Rick Astley',
    songName: 'Never gonna give you up',
  });

  const [index, setIndex] = useState<number>(0);

  //
  function goNext() {
    if (index + 1 >= karaokeResponse.lyrics.length) {
      return;
    }
    setIndex(index + 1);
  }

  return (
    <Container>
      <Flex direction="row" gap={2}>
        <Text fontWeight="bold">{karaokeResponse.songName}</Text>
        <Text>{karaokeResponse.artist}</Text>
      </Flex>
      <KaraokeLyricsCard>
        <SongLine sentence={sentence} time={4000} />
      </KaraokeLyricsCard>
    </Container>
  );
}
