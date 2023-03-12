import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Gamemode } from '@/models/gamemode';
import LoadingScreen from '@/components/LoadingScreen';

// songQuery, mode
async function fetchLyrics(songQuery: string, mode: Gamemode) {
  const response = await fetch('/api/lyrics', {
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

async function fetchMusicUrl(songQuery: string, mode: Gamemode) {
  const response = await fetch('/api/lyrics', {
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

  const { songQuery, mode } = router.query as {
    songQuery: string;
    mode: Gamemode;
  };

  const {
    data: lyrics,
    isLoading: isLyricsLoading,
    error: lyricsError,
  } = useQuery({
    queryKey: ['karaoke', songQuery],
    queryFn: () => fetchLyrics(songQuery, mode),
  });

  const {
    data: musicUrl,
    isLoading: isMusicLoading,
    error: musicError,
  } = useQuery({
    queryKey: ['karaoke', songQuery],
    queryFn: () => fetchMusicUrl(songQuery, mode),
  });

  if (isLyricsLoading || isMusicLoading) {
    return <div>Loading...</div>;
  }

  if (lyricsError || musicError) {
    const error = lyricsError || musicError;
    return <div>Error: {JSON.stringify(error, null, 2)}</div>;
  }

  return (
    <>
      <h2>Lyrics:</h2>
      <pre>{JSON.stringify(lyrics, null, 2)}</pre>
      <h2>Music Href:</h2>
      <pre>{JSON.stringify(musicUrl, null, 2)}</pre>
    </>
  );
}
