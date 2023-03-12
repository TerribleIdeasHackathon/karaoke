import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Gamemode } from '@/models/gamemode';
import LoadingScreen from '@/components/LoadingScreen';
import KaraokeScreen from '@/components/KaraokeScreen';

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

async function fetchYoutubeId(songQuery: string, mode: Gamemode) {
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
    data: karaokeResponse,
    isLoading: isLyricsLoading,
    error: lyricsError,
  } = useQuery({
    queryKey: ['karaoke', songQuery],
    queryFn: () => fetchLyrics(songQuery, mode),
  });

  const {
    data: { youtubeId },
    isLoading: isMusicLoading,
    error: musicError,
  } = useQuery({
    queryKey: ['karaoke', songQuery],
    queryFn: () => fetchYoutubeId(songQuery, mode),
  });

  if (isLyricsLoading || isMusicLoading) {
    return <LoadingScreen />;
  }

  if (lyricsError || musicError) {
    // TODO: Make this a cleaner display
    const error = lyricsError || musicError;
    return <div>Error: {JSON.stringify(error, null, 2)}</div>;
  }

  return <KaraokeScreen karaokeResponse={karaokeResponse} youtubeId={youtubeId} />;
}
