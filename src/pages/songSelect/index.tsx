//create the page here
import styles from '@/styles/Home.module.css';
import { Button, Flex, Input, Box, Center, Text, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

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
            <Input width="400px" type="text" placeholder="Search for song" />
          </Box>

          <Center>
            <Text>GAME MODE</Text>
          </Center>

          <Flex>
            <Button size="md" flex="1" onClick={(e: any) => setMode(mode - 1)}>
              <ArrowBackIcon boxSize={5} color="#ef3499" />
            </Button>
            <Box flex="6">
              <Center>
                <Text fontSize={'23px'}>{modes[Math.abs(mode % modes.length)]}</Text>
              </Center>
            </Box>
            <Button size="md" flex="1" onClick={(e: any) => setMode(mode + 1)}>
              <ArrowForwardIcon boxSize={5} color="#ef3499" />
            </Button>
          </Flex>
          <Link href="/sing">
            <Button width={'full'} colorScheme={'pink'}>
              Sing!
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

//export the component to render it
