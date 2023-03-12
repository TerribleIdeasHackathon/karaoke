import SongLine from '@/components/SongLine';
import { motion } from 'framer-motion';
import KaraokeLyricsCard from '@/components/KaraokeLyricsCard';
import { KaraokeResponse } from '@/models/karaokeResponse';
import { Button, Container, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import useSongControls from '@/hooks/useSongControls';
import { useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import Head from 'next/head';
import Header from './Header';
import { ArrowBackIcon } from '@chakra-ui/icons';

interface KaraokeScreenProps {
  karaokeResponse: KaraokeResponse;
  mode: string;
  theme?: string;
}

export default function KaraokeScreen({ karaokeResponse, mode, theme }: KaraokeScreenProps) {
  const { index, controlsA, controlsB, controlsC, shiftIndex } = useSongControls(karaokeResponse.lyrics);

  const maxIdx = karaokeResponse.lyrics.length - 1;
  const nextIdx = index + 1;

  return (
    <>
      <Head>
        <title>KarAIoki</title>
      </Head>
      <Header>
        <Link href="/">
          <IconButton aria-label="Go back to home" title="Go back to home" icon={<ArrowBackIcon />} />
        </Link>
      </Header>
      <Container maxW={'3xl'}>
        <Flex width="full" justifyContent="space-between" pb="5" px="2" direction="row" gap={2}>
          <div>
            <Text as="span" fontWeight="bold">
              {karaokeResponse.songName + ' '}
            </Text>
            <Text as="span">{karaokeResponse.artist}</Text>
          </div>
          <div>
            <Text as="span" fontWeight="bold">
              {mode === 'themes' ? 'Theme: ' : 'Opposite'}
            </Text>
            {theme && <Text as="span">{theme}</Text>}
          </div>
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
        <Flex direction="row" mt={10}>
          <Button
            onClick={() => {
              shiftIndex(-1);
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              shiftIndex(1);
            }}
          >
            Forward
          </Button>
        </Flex>
      </Container>
    </>
  );
}
