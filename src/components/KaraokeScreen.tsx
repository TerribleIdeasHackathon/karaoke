import SongLine from '@/components/SongLine';
import { motion } from 'framer-motion';
import KaraokeLyricsCard from '@/components/KaraokeLyricsCard';
import { KaraokeResponse } from '@/models/karaokeResponse';
import { Container, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import useSongControls from '@/hooks/useSongControls';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Head from 'next/head';
import Header from './Header';
import { ArrowBackIcon } from '@chakra-ui/icons';

interface KaraokeScreenProps {
  karaokeResponse: KaraokeResponse;
  youtubeId: string;
}

export default function KaraokeScreen({ karaokeResponse, youtubeId }: KaraokeScreenProps) {
  const { index, controlsA, controlsB, controlsC } = useSongControls(karaokeResponse.lyrics);

  console.log(youtubeId);

  const maxIdx = karaokeResponse.lyrics.length - 1;
  const nextIdx = index + 1;

  console.log(youtubeId);

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
        <Flex pb="5" pl="2" direction="row" gap={2}>
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
        <ReactPlayer
          url={`https://youtube.com/embed/${youtubeId}?autoplay=1`}
          playing={true}
          width={'480px'}
          height={'270px'}
        />
      </Container>
    </>
  );
}
