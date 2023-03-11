import { Button, Flex, Input, Box, Center, Text, IconButton, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Gamemode } from '@/models/gamemode';
import { useRouter } from 'next/router';

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

  const updateModeIndex = (newModeIndex: number) => {
    setModeIndex(Math.abs(newModeIndex % modes.length));
  };

  const handleSongQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongQuery(e.target.value);
  };

  const handleClickSing = () => {
    // This can only be called when songQuery is not an empty string
    router.push({ pathname: '/karaoke', query: { songQuery, mode: modes[modeIndex].mode } });
  };

  return (
    <>
      <Header>
        <Link href="/">
          <IconButton aria-label="Go back to home" title="Go back to home" icon={<ArrowBackIcon />} />
        </Link>
      </Header>
      <Box display={'grid'} justifyContent={'center'} alignItems="center" minHeight="100vh">
        <Box
          bg="#131416c2"
          backgroundSize="cover"
          backgroundPosition={'center'}
          display={'grid'}
          gap="15px"
          borderRadius={'10px'}
          justifyContent={'center'}
          alignItems="center"
          padding={'30px'}
          width="600px"
        >
          <Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input
                width="400px"
                placeholder="Search for a song"
                onChange={handleSongQueryChange}
                value={songQuery}
                _focusVisible={{
                  borderColor: '#ef3499',
                  boxShadow: '0 0 0 1px #ef3499',
                }}
              />
            </InputGroup>
          </Box>

          <Center>
            <Text>Select Game Mode</Text>
          </Center>

          <Flex>
            <Button size="md" flex="1" onClick={() => updateModeIndex(modeIndex - 1)}>
              <ArrowBackIcon boxSize={5} color="#ef3499" />
            </Button>
            <Box flex="6">
              <Center>
                <Text fontSize={'23px'}>{modes[modeIndex].displayMode}</Text>
              </Center>
            </Box>
            <Button size="md" flex="1" onClick={() => updateModeIndex(modeIndex + 1)}>
              <ArrowForwardIcon boxSize={5} color="#ef3499" />
            </Button>
          </Flex>
          <Button width="full" colorScheme="pink" isDisabled={songQuery.length === 0} onClick={handleClickSing}>
            Sing!
          </Button>
        </Box>
      </Box>
    </>
  );
}
