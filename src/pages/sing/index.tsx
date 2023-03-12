import SongLine from '@/components/SongLine';

import { motion } from 'framer-motion';
import { useState } from 'react';

import KaraokeLyricsCard from '@/components/KaraokeLyricsCard';
import { KaraokeResponse } from '@/models/karaokeResponse';
import { Container, Flex, Text } from '@chakra-ui/react';
import useSongControls from './useSongControls';

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

  const { index, controlsA, controlsB, controlsC } = useSongControls(karaokeResponse.lyrics);

  const maxIdx = karaokeResponse.lyrics.length - 1;
  const nextIdx = index + 1;

  return (
    <Container maxW={'3xl'}>
      <Flex direction="row" gap={2}>
        <Text fontWeight="bold">{karaokeResponse.songName}</Text>
        <Text>{karaokeResponse.artist}</Text>
      </Flex>
      <KaraokeLyricsCard>
        <motion.div animate={controlsA} style={{ y: 0 }}>
          <SongLine sentence={karaokeResponse.lyrics[index].lyric} time={karaokeResponse.lyrics[index].duration} />
        </motion.div>

        <Text fontWeight="bold" as={motion.p} animate={controlsB} color="gray.500">
          {nextIdx <= maxIdx ? karaokeResponse.lyrics[nextIdx].lyric : '🎶🎙🎶'}
        </Text>

        <Text as={motion.p} fontWeight="bold" color="gray.500" animate={controlsC} style={{ opacity: 0 }}>
          {index + 2 <= maxIdx ? karaokeResponse.lyrics[index + 2].lyric : '🎶🎙🎶'}
        </Text>
      </KaraokeLyricsCard>
    </Container>
  );
}
