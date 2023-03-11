import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

interface SongLineProps {
  sentence: string;
  time: number;
}

const SongLine = ({ sentence, time }: SongLineProps) => {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIdx((prev) => prev + 1);
    }, time / sentence.split(' ').length);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {sentence.split(' ').map((word, idx) => {
        const isCurrentWord = idx === currentWordIdx;
        const isNextWord = idx < currentWordIdx + 1;
        return (
          <Text
            as="span"
            key={word}
            color={isCurrentWord ? '#ef3499' : isNextWord ? 'gray.500' : 'black'}
            fontWeight="bold"
          >
            {word + ' '}
          </Text>
        );
      })}
    </>
  );
};
export default SongLine;
