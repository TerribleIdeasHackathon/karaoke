//create the page here
import { Button, Flex, Input, Box, Center, Text } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useState } from 'react';

export default function SongSelect() {
  const modes = ['Antonym', 'Theme'];
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box display={'grid'} justifyContent={'center'} alignItems="center" minHeight="100vh">
        <Center
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
          <Text fontSize={'50px'}>Song Select!</Text>
        </Center>
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
        </Box>
      </Box>
    </>
  );
}

//export the component to render it
