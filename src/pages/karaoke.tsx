import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Gamemode } from '@/models/gamemode';
import LoadingScreen from '@/components/LoadingScreen';
import KaraokeScreen from '@/components/KaraokeScreen';
import { useMemo, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Box, Button } from '@chakra-ui/react';

async function fetchLyrics(songQuery: string, mode: Gamemode, theme?: string) {
  // return await Promise.resolve({
  //   lyrics: [
  //     {
  //       timestampMs: 0,
  //       lyric: 'Woo~ Boy, you’re fading',
  //       duration: 2000,
  //     },
  //     {
  //       timestampMs: 12580,
  //       lyric: 'Like a dull rock on the sidewalk',
  //       duration: 2370,
  //     },
  //     {
  //       timestampMs: 14950,
  //       lyric: 'And they make you like they used to',
  //       duration: 2560,
  //     },
  //     {
  //       timestampMs: 17510,
  //       lyric: 'You’re always out of style',
  //       duration: 2500,
  //     },
  //     {
  //       timestampMs: 20380,
  //       lyric: 'Woo~ Ugly baby',
  //       duration: 1500,
  //     },
  //     {
  //       timestampMs: 22880,
  //       lyric: 'This world mighta gone sane',
  //       duration: 2060,
  //     },
  //     {
  //       timestampMs: 24940,
  //       lyric: 'The way you hurt me, who could blame me',
  //       duration: 2180,
  //     },
  //     {
  //       timestampMs: 27120,
  //       lyric: 'When I just wanna make you frown',
  //       duration: 2500,
  //     },
  //     {
  //       timestampMs: 29620,
  //       lyric: 'I want to ignore you like Michael',
  //       duration: 1990,
  //     },
  //     {
  //       timestampMs: 31610,
  //       lyric: 'I want to slap you like Prince',
  //       duration: 1810,
  //     },
  //     {
  //       timestampMs: 33420,
  //       lyric: 'Let’s leave it off like Marvin Gaye, like Hathaway',
  //       duration: 2310,
  //     },
  //     {
  //       timestampMs: 35730,
  //       lyric: 'Erase a song for you like this',
  //       duration: 2750,
  //     },
  //     {
  //       timestampMs: 38480,
  //       lyric: 'You’re under my feet, I’m in my right mind',
  //       duration: 2430,
  //     },
  //     {
  //       timestampMs: 40910,
  //       lyric: 'Thinking I was born in the right time',
  //       duration: 2060,
  //     },
  //     {
  //       timestampMs: 42970,
  //       lyric: 'Just like a fast forward, everything is so futuristic',
  //       duration: 2190,
  //     },
  //     {
  //       timestampMs: 45160,
  //       lyric: 'I kinda hate it, hate it',
  //       duration: 3000,
  //     },
  //     {
  //       timestampMs: 48960,
  //       lyric: "You're in my league, new school bleak",
  //       duration: 3500,
  //     },
  //     {
  //       timestampMs: 53770,
  //       lyric: 'Like a reject from a cyber screen',
  //       duration: 3500,
  //     },
  //     {
  //       timestampMs: 58510,
  //       lyric: 'You’re one of a kind, living in a world gone organic',
  //       duration: 2500,
  //     },
  //     {
  //       timestampMs: 61010,
  //       lyric: 'Baby, you’re so common',
  //       duration: 1680,
  //     },
  //     {
  //       timestampMs: 62690,
  //       lyric: 'Baby, you’re so common',
  //       duration: 2000,
  //     },
  //     {
  //       timestampMs: 64870,
  //       lyric: 'Baby, you’re so common',
  //       duration: 2000,
  //     },
  //     {
  //       timestampMs: 67370,
  //       lyric: 'Oh~ A dozen thorns',
  //       duration: 2000,
  //     },
  //     {
  //       timestampMs: 69800,
  //       lyric: 'Anything for you to ignore',
  //       duration: 1870,
  //     },
  //     {
  //       timestampMs: 71670,
  //       lyric: 'All the way to bother you',
  //       duration: 2500,
  //     },
  //     {
  //       timestampMs: 74170,
  //       lyric: 'Doing it’s your style',
  //       duration: 2000,
  //     },
  //     {
  //       timestampMs: 76480,
  //       lyric: "I'ma pick you up in a broken car",
  //       duration: 2250,
  //     },
  //     {
  //       timestampMs: 78730,
  //       lyric: 'Like a jerk, bringing tackiness back',
  //       duration: 1870,
  //     },
  //     {
  //       timestampMs: 80600,
  //       lyric: 'Keep it fake to fake in the way I feel',
  //       duration: 1930,
  //     },
  //     {
  //       timestampMs: 82530,
  //       lyric: 'I could run away from the aisle',
  //       duration: 2880,
  //     },
  //     {
  //       timestampMs: 85410,
  //       lyric: 'I want to ignore you like Michael',
  //       duration: 2620,
  //     },
  //     {
  //       timestampMs: 88030,
  //       lyric: 'I want to slap you like Prince',
  //       duration: 1870,
  //     },
  //     {
  //       timestampMs: 89900,
  //       lyric: 'Let’s leave it off like Marvin Gaye, like Hathaway',
  //       duration: 2560,
  //     },
  //     {
  //       timestampMs: 92460,
  //       lyric: 'Erase a song for you like this',
  //       duration: 3490,
  //     },
  //     {
  //       timestampMs: 95950,
  //       lyric: 'You’re under my feet, I’m in my right mind',
  //       duration: 1310,
  //     },
  //     {
  //       timestampMs: 97260,
  //       lyric: 'Thinking I was born in the right time',
  //       duration: 2370,
  //     },
  //     {
  //       timestampMs: 99630,
  //       lyric: 'It’s like a fast forward, everything is so futuristic',
  //       duration: 2250,
  //     },
  //     {
  //       timestampMs: 101880,
  //       lyric: 'I kinda hate it, hate it',
  //       duration: 3000,
  //     },
  //     {
  //       timestampMs: 105500,
  //       lyric: "You're in my league, new school bleak",
  //       duration: 3500,
  //     },
  //     {
  //       timestampMs: 110240,
  //       lyric: 'Like a reject from a cyber screen',
  //       duration: 3500,
  //     },
  //     {
  //       timestampMs: 115040,
  //       lyric: 'You’re one of a kind, living in a world gone organic',
  //       duration: 2000,
  //     },
  //     {
  //       timestampMs: 117040,
  //       lyric: 'Baby, you’re so common',
  //       duration: 1870,
  //     },
  //     {
  //       timestampMs: 118910,
  //       lyric: 'Baby, you’re so common',
  //       duration: 2000,
  //     },
  //     {
  //       timestampMs: 121160,
  //       lyric: "Baby, you're so common",
  //       duration: 2000,
  //     },
  //     {
  //       timestampMs: 123470,
  //       lyric: 'Baby you’re trash, and baby you’re well',
  //       duration: 3060,
  //     },
  //     {
  //       timestampMs: 126530,
  //       lyric: "I always met a girl like you ever 'til we met",
  //       duration: 1740,
  //     },
  //     {
  //       timestampMs: 128270,
  //       lyric: 'A star in the 40′s, centerfold in the 50′s',
  //       duration: 1940,
  //     },
  //     {
  //       timestampMs: 130210,
  //       lyric: 'You got met trippin’ out like the 60′s, hippies',
  //       duration: 2500,
  //     },
  //     {
  //       timestampMs: 132710,
  //       lyric: 'Queen of the discotheque',
  //       duration: 1620,
  //     },
  //     {
  //       timestampMs: 134330,
  //       lyric: 'A 70′s gleam with an 80′s vest',
  //       duration: 1490,
  //     },
  //     {
  //       timestampMs: 135820,
  //       lyric: 'Pepper, Beyonce, Marilyn, Massive',
  //       duration: 1330,
  //     },
  //     {
  //       timestampMs: 137150,
  //       lyric: 'Girl you’re timeless',
  //       duration: 1500,
  //     },
  //     {
  //       timestampMs: 139400,
  //       lyric: 'Just so common',
  //       duration: 1500,
  //     },
  //     {
  //       timestampMs: 142830,
  //       lyric: 'You’re under my feet, I’m in my right mind',
  //       duration: 1560,
  //     },
  //     {
  //       timestampMs: 144390,
  //       lyric: 'Thinking I was born in the right time',
  //       duration: 2370,
  //     },
  //     {
  //       timestampMs: 146760,
  //       lyric: 'It’s like a fast forward, everything is so futuristic',
  //       duration: 2060,
  //     },
  //     {
  //       timestampMs: 148820,
  //       lyric: 'I kinda hate it, hate it',
  //       duration: 3000,
  //     },
  //     {
  //       timestampMs: 152630,
  //       lyric: "You're in my league, new school bleak",
  //       duration: 3500,
  //     },
  //     {
  //       timestampMs: 157490,
  //       lyric: 'Like a reject from a cyber screen',
  //       duration: 3500,
  //     },
  //     {
  //       timestampMs: 162300,
  //       lyric: 'You’re one of a kind, living in a world gone organic',
  //       duration: 5500,
  //     },
  //   ],
  //   songName: ' Classic',
  //   artist: null,
  // });

  const response = await fetch('/api/lyrics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      songQuery,
      mode,
      theme,
    }),
  });

  const data = await response.json();

  return data;
}

async function fetchYoutubeId(songQuery: string, mode: Gamemode) {
  return await Promise.resolve({ youtubeId: '4Ba_qTPA4Ds' });

  const response = await fetch('/api/music', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      songQuery,
      mode,
    }),
  });

  const data = await response.json();
  return data;
}

export default function KaraokePage() {
  const router = useRouter();
  const [playMusic, setPlayMusic] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const { songQuery, mode, theme } = router.query as {
    songQuery: string;
    mode: Gamemode;
    theme?: string;
  };

  const {
    data: karaokeResponse,
    isLoading: isLyricsLoading,
    error: lyricsError,
  } = useQuery(['lyrics', songQuery], {
    queryFn: () => fetchLyrics(songQuery, mode, theme),
  });

  const {
    data: musicData,
    isLoading: isMusicLoading,
    error: musicError,
  } = useQuery({
    queryKey: ['music', songQuery],
    queryFn: () => fetchYoutubeId(songQuery, mode),
  });

  console.log(karaokeResponse);

  const reactPlayer = useMemo(
    () =>
      musicData?.youtubeId === undefined ? null : (
        <ReactPlayer
          onReady={() => console.log('ready')}
          onStart={() => {
            setMusicStarted(true);
            console.log('started');
          }}
          url={`https://www.youtube.com/watch?v=${musicData.youtubeId}`}
          playing={playMusic}
          width={'100px'}
          height={'100px'}
        />
      ),
    [musicData, playMusic],
  );

  if (isLyricsLoading || isMusicLoading) {
    return <LoadingScreen />;
  }

  if (lyricsError || musicError) {
    // TODO: Make this a cleaner display
    const error = lyricsError || musicError;
    return <div>Error: {JSON.stringify(error, null, 2)}</div>;
  }

  console.log('render');

  const showPlayButton = !playMusic && !isMusicLoading && !isLyricsLoading;

  return (
    <Box>
      {showPlayButton && <Button onClick={() => setPlayMusic(true)}>Play!</Button>}
      {reactPlayer}
      {isLyricsLoading || !musicStarted ? (
        <LoadingScreen />
      ) : (
        <KaraokeScreen karaokeResponse={karaokeResponse} mode={mode} theme={theme} />
      )}
    </Box>
  );
}
