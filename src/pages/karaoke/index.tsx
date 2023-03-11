//create the page here
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { Stack, Button, Container, Flex, Input, HStack, Box, Center, VStack, Text, Square } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export default function Karaoke() {
  return (
    <>
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
            <Button size="sm" flex="1">
              <ArrowBackIcon color="#ef3499" />
            </Button>
            <Box flex="6">
              <Center>
                <Text>Antonym</Text>
              </Center>
            </Box>
            <Button size="sm" flex="1">
              <ArrowForwardIcon color="#ef3499" />
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

//export the component to render it
