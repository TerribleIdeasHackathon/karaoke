import {
  Button,
  Flex,
  Input,
  Box,
  Center,
  Text,
  IconButton,
  Container,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Card from '@/components/Card';
import { Gamemode } from '@/models/gamemode';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface ModeData {
  mode: Gamemode;
  displayMode: string;
}

export default function SongSelect() {
  const router = useRouter();

  const modes: ModeData[] = [
    { mode: Gamemode.Antonym, displayMode: 'Opposite' },
    { mode: Gamemode.Themes, displayMode: 'Themes' },
  ];
  const [modeIndex, setModeIndex] = useState(0);
  const [songQuery, setSongQuery] = useState('');
  const [theme, setTheme] = useState('');

  const canSubmit = songQuery.length !== 0 && (theme.length !== 0 || modes[modeIndex].mode !== Gamemode.Themes);

  const updateModeIndex = (newModeIndex: number) => {
    setModeIndex(Math.abs(newModeIndex % modes.length));
  };

  const handleSongQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongQuery(e.target.value);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      handleRequestSong();
    }
  };

  const handleRequestSong = () => {
    // This can only be called when songQuery is not an empty string
    router.push({ pathname: '/karaoke', query: { songQuery, mode: modes[modeIndex].mode, theme } });
  };

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
      <Container maxWidth="2xl" display="flex" flexDirection="column" gap={5}>
        <Center>
          <Text fontSize="4xl" fontWeight="bold">
            Select Song
          </Text>
        </Center>
        <form onSubmit={handleSubmit}>
          <Card>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input
                placeholder="Search for a song"
                onChange={handleSongQueryChange}
                value={songQuery}
                _focusVisible={{
                  borderColor: '#ef3499',
                  boxShadow: '0 0 0 1px #ef3499',
                }}
              />
            </InputGroup>

            <Center>
              <Text>Select Game Mode</Text>
            </Center>
            <Flex width="full" gap={5}>
              <Button size="md" onClick={() => updateModeIndex(modeIndex - 1)}>
                <ArrowBackIcon boxSize={5} color="#ef3499" />
              </Button>
              <Center width="full" borderWidth="1px" borderRadius="md">
                <Text fontSize="xl">{modes[modeIndex].displayMode}</Text>
              </Center>
              <Button size="md" onClick={() => updateModeIndex(modeIndex + 1)}>
                <ArrowForwardIcon boxSize={5} color="#ef3499" />
              </Button>
            </Flex>
            {modes[modeIndex].mode === Gamemode.Themes && (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  placeholder="Enter a theme"
                  onChange={handleThemeChange}
                  value={theme}
                  _focusVisible={{
                    borderColor: '#ef3499',
                    boxShadow: '0 0 0 1px #ef3499',
                  }}
                />
              </InputGroup>
            )}
            <Button
              width="full"
              colorScheme="pink"
              isDisabled={!canSubmit}
              bgColor="#ef3499"
              onClick={handleRequestSong}
            >
              Sing!
            </Button>
          </Card>
        </form>
      </Container>
    </>
  );
}
