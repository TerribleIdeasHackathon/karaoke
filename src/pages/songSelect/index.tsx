import { Button, Flex, Input, Box, Center, Text, IconButton, Container } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import SongSelectCard from '@/components/SongSelectCard';

export default function SongSelect() {
  const modes = ['Antonym', 'Theme'];
  const [mode, setMode] = useState(0);

  return (
    <>
      <Header>
        <Link href="/">
          <IconButton aria-label="Go back to home" title="Go back to home" icon={<ArrowBackIcon />} />
        </Link>
      </Header>
      <Container maxWidth="2xl" display="flex" flexDirection="column" gap={5}>
        <SongSelectCard>
          <Text fontSize="2xl">Search For A Song</Text>
        </SongSelectCard>
        <SongSelectCard>
          <Input type="text" placeholder="Search for song" />

          <Center>
            <Text>GAME MODE</Text>
          </Center>

          <Flex width="full">
            <Button size="md" onClick={() => setMode(mode - 1)}>
              <ArrowBackIcon boxSize={5} color="#ef3499" />
            </Button>
            <Box width="full">
              <Center>
                <Text fontSize={'23px'}>{modes[Math.abs(mode % modes.length)]}</Text>
              </Center>
            </Box>
            <Button size="md" onClick={() => setMode(mode + 1)}>
              <ArrowForwardIcon boxSize={5} color="#ef3499" />
            </Button>
          </Flex>
          <Link href="/sing" style={{ width: '100%' }}>
            <Button width="full" colorScheme={'pink'}>
              Sing!
            </Button>
          </Link>
        </SongSelectCard>
      </Container>
    </>
  );
}
