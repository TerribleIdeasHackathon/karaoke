import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Gamemode } from '@/models/gamemode';

async function fetchLyrics(songName: string, mode: Gamemode) {
  const response = await fetch('/api/lyrics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      songName,
      mode,
    }),
  });
  const data = await response.json();
  return data;
}

export default function KaraokePage() {
  const router = useRouter();

  const { songName, mode } = router.query as {
    songName: string;
    mode: Gamemode;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['karaoke', songName],
    queryFn: () => fetchLyrics(songName, mode),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error, null, 2)}</div>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
