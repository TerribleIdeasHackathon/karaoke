import { Container, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import KaraokeLyricsCard from '../../components/KaraokeLyricsCard';
import { KaraokeResponse } from '../../models/karaokeResponse';

export default function Karaoke() {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [karaokeResponse, setKaraokeResponse] = useState<KaraokeResponse>({
    lyrics: [{ timestampMs: 0, lyric: 'Test' }],
    artist: 'Rick Astley',
    songName: 'Never gonna give you up',
  });

  const sentence = 'This is a longer sentence';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIdx((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Flex direction="row" gap={2}>
        <Text fontWeight="bold">{karaokeResponse.songName}</Text>
        <Text>{karaokeResponse.artist}</Text>
      </Flex>
      <KaraokeLyricsCard>
        {sentence.split(' ').map((word, idx) => {
          const isCurrentWord = idx === currentWordIdx;
          const isNextWord = idx < currentWordIdx + 1;
          return (
            <Text
              as="span"
              key={word}
              color={isCurrentWord ? 'red.500' : isNextWord ? 'gray.500' : 'black'}
              fontWeight="bold"
            >
              {word + ' '}
            </Text>
          );
        })}
      </KaraokeLyricsCard>
    </Container>
  );
}
