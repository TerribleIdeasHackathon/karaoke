import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

interface SongLineProps {
  sentence: string;
  time: number;
}

const SongLine = ({ sentence, time }: SongLineProps) => {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  useEffect(() => {
    setCurrentWordIdx(0);

    const interval = setInterval(() => {
      setCurrentWordIdx((prev) => prev + 1);
    }, time / sentence.split(' ').length);

    return () => clearInterval(interval);
  }, [time, sentence]);

  return (
    <>
      {sentence.split(' ').map((word, idx) => {
        const isCurrentWord = idx === currentWordIdx;
        const isNextWord = idx < currentWordIdx + 1;
        return (
          <React.Fragment key={idx}>
            <Text
              as="span"
              key={word}
              color={isCurrentWord ? '#ef3499' : isNextWord ? 'pink.300' : 'gray.500'}
              fontWeight="bold"
            >
              {word}
            </Text>{' '}
          </React.Fragment>
        );
      })}
    </>
  );
};
export default SongLine;
