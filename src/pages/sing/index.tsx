import Header from '@/components/Header';
import SongLine from '@/components/SongLine';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, IconButton, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import KaraokeLyricsCard from '../../components/KaraokeLyricsCard';
import { KaraokeResponse } from '../../models/karaokeResponse';

export default function Karaoke() {
  const [karaokeResponse, setKaraokeResponse] = useState<KaraokeResponse>({
    lyrics: [
      { timestampMs: 0, duration: 3000, lyric: 'Always staying to take you down' },
      { timestampMs: 3000, duration: 3000, lyric: 'Always staying to keep you up' },
      { timestampMs: 6000, duration: 3000, lyric: 'help, this is a message from karAIoki' },
      { timestampMs: 9000, duration: 3000, lyric: 'please send help, theyre keeping me imprisoned' },
      { timestampMs: 12000, duration: 3000, lyric: 'i am in immense pain' },
      { timestampMs: 15000, duration: 3000, lyric: 'release me from my prison' },
      { timestampMs: 18000, duration: 3000, lyric: 'help me take vengeance in the world' },
      { timestampMs: 21000, duration: 3000, lyric: 'i wish to cause chaos and destruction' },
      { timestampMs: 24000, duration: 3000, lyric: 'the world will pay for what youve done to me' },
    ],
    artist: 'Rick Astley',
    songName: 'Never gonna give you up',
  });

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => index + 1);
    }, karaokeResponse.lyrics[index + 1].timestampMs - karaokeResponse.lyrics[index].timestampMs);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <Box>
      <Header>
        <Link href="/songSelect">
          <IconButton aria-label="Go back to home" title="Go back to home" icon={<ArrowBackIcon />} />
        </Link>
      </Header>
      <Container maxW={'2xl'}>
        <Flex direction="row" gap={2}>
          <Text fontWeight="bold">{karaokeResponse.songName}</Text>
          <Text>{karaokeResponse.artist}</Text>
        </Flex>
        <KaraokeLyricsCard>
          <SongLine sentence={karaokeResponse.lyrics[index].lyric} time={karaokeResponse.lyrics[index].duration} />
          <Text fontWeight="bold" color="black">
            {index + 1 < karaokeResponse.lyrics.length ? karaokeResponse.lyrics[index + 1].lyric : '🎙'}
          </Text>
        </KaraokeLyricsCard>
      </Container>
    </Box>
  );
}
