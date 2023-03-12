import { KaraokeResponse } from '@/models/karaokeResponse';
import { useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const textHeight = 1.875;

export default function useSongControls(lyrics: KaraokeResponse['lyrics']) {
  const controlsA = useAnimation();
  const controlsB = useAnimation();
  const controlsC = useAnimation();

  const [index, setIndex] = useState(0);
  const maxIdx = lyrics.length - 1;

  function shiftIndex(index: -1 | 1) {
    setIndex((curIndex) => {
      const newIndex = curIndex + index;
      if (newIndex < 0) return 0;
      if (newIndex > maxIdx) return maxIdx;
      return curIndex + index;
    });
  }

  useEffect(() => {
    let timeout: NodeJS.Timer;

    if (index < maxIdx) {
      timeout = setTimeout(() => {
        setIndex((index) => index + 1);
      }, lyrics[index + 1].timestampMs - lyrics[index].timestampMs);
    }

    const defaultAnimation = {
      y: [`0rem`, `-${textHeight}rem`, `-${textHeight}rem`],
      transition: {
        times: [0, 0.7, 1],
        duration: 0.35,
        delay: (lyrics[index].duration - 350) / 1000,
      },
    };
    const halfYTransform = [`0rem`, `-${textHeight / 2}rem`, `-${textHeight / 2}rem`];

    controlsA.start({
      ...defaultAnimation,
      opacity: [1, 0, 0],
    });

    if (index >= lyrics.length - 1) {
      controlsB.start({
        ...defaultAnimation,
        y: halfYTransform,
      });
    } else {
      controlsB.start({
        ...defaultAnimation,
      });
    }

    if (index >= lyrics.length - 1) {
      controlsC.start({
        opacity: 0,
      });
    } else {
      controlsC.start({
        ...defaultAnimation,
        opacity: [0, 1, 1],
      });
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [index, lyrics, maxIdx, controlsA, controlsB, controlsC]);

  return {
    shiftIndex,
    index,
    controlsA,
    controlsB,
    controlsC,
  };
}
