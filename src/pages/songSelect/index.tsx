//create the page here
import styles from '@/styles/Home.module.css';
import { Button, Flex, Input, Box, Center, Text, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function SongSelect() {
  const modes = ['Antonim', 'Theme'];
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
          bg="#2D3134"
          backgroundSize="cover"
          backgroundPosition={'center'}
          display={'grid'}
          gap="10px"
          borderRadius={'10px'}
          justifyContent={'center'}
          alignItems="center"
          padding={'30px'}
          width="600px"
        >
          <Flex color="white">
            <Center flex="1" paddingRight={3}>
              <Text>Song Search</Text>
            </Center>

            <Box flex="2">
              <Input bg="white" color={'black'} type="text" placeholder="search" />
            </Box>
          </Flex>
          <Center color="white">
            <Text>GAME MODE</Text>
          </Center>
          <Flex color="white">
            <Button size="sm" flex="1" onClick={(e: any) => setMode(mode - 1)}>
              <ArrowBackIcon color="#ef3499" />
            </Button>
            <Box flex="6">
              <Center>
                <Text>{modes[Math.abs(mode % modes.length)]}</Text>
              </Center>
            </Box>
            <Button size="sm" flex="1" onClick={(e: any) => setMode(mode + 1)}>
              <ArrowForwardIcon color="#ef3499" />
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
