import SongLine from '@/components/SongLine';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

import KaraokeLyricsCard from '@/components/KaraokeLyricsCard';
import { KaraokeResponse } from '@/models/karaokeResponse';
import { Container, Flex, Text } from '@chakra-ui/react';

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
  const controlsA = useAnimation();
  const controlsB = useAnimation();
  const controlsC = useAnimation();

  const [index, setIndex] = useState(0);

  const maxIdx = karaokeResponse.lyrics.length - 1;
  const nextIdx = index + 1;

  useEffect(() => {
    if (index >= maxIdx) {
      return;
    }

    const interval = setInterval(() => {
      setIndex((index) => index + 1);
    }, karaokeResponse.lyrics[index + 1].timestampMs - karaokeResponse.lyrics[index].timestampMs);

    return () => clearInterval(interval);
  }, [index, karaokeResponse.lyrics, maxIdx]);

  useEffect(() => {
    controlsA.start({
      y: ['0rem', '-1.9rem', '-1.9rem'],
      opacity: [1, 0, 0],
      transition: {
        times: [0, 0.7, 1],
        duration: 0.35,
        delay: (karaokeResponse.lyrics[index].duration - 350) / 1000,
      },
    });
  }, [index, karaokeResponse.lyrics, controlsA]);

  useEffect(() => {
    if (index >= karaokeResponse.lyrics.length - 1) {
      controlsB.start({
        y: ['0rem', '-0.95rem', '-0.95rem'],
        transition: {
          times: [0, 0.7, 1],
          duration: 0.35,
          delay: (karaokeResponse.lyrics[index].duration - 350) / 1000,
        },
      });
    } else {
      controlsB.start({
        y: ['0rem', '-1.9rem', '-1.9rem'],
        // color: ['#718096', '#ED64A6', '#ED64A6'],
        transition: {
          times: [0, 0.7, 1],
          duration: 0.35,
          delay: (karaokeResponse.lyrics[index].duration - 350) / 1000, // 2.5
        },
      });
    }
  }, [index, karaokeResponse.lyrics, controlsB]);

  useEffect(() => {
    if (index >= karaokeResponse.lyrics.length - 1) {
      controlsC.start({
        opacity: 0,
      });
    } else {
      controlsC.start({
        y: ['0rem', '-1.9rem', '-1.9rem'],
        opacity: [0, 1, 1],
        transition: {
          times: [0, 0.7, 1],
          duration: 0.35,
          delay: (karaokeResponse.lyrics[index].duration - 350) / 1000,
        },
      });
    }
  }, [index, karaokeResponse.lyrics, controlsC]);

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
        {/* <motion.div style={{ y: 0 }}> */}
        <Text fontWeight="bold" as={motion.p} animate={controlsB} color="gray.500">
          {nextIdx <= maxIdx ? karaokeResponse.lyrics[nextIdx].lyric : '🎶🎙🎶'}
        </Text>
        {/* </motion.div> */}
        <motion.div animate={controlsC} style={{ y: 0, opacity: 0 }}>
          <Text fontWeight="bold" color="gray.500">
            {index + 2 <= maxIdx ? karaokeResponse.lyrics[index + 2].lyric : '🎶🎙🎶'}
          </Text>
        </motion.div>
      </KaraokeLyricsCard>
    </Container>
  );
}
