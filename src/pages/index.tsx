import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Button, Center } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import Card from '@/components/Card';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export default function Home() {
  return (
    <>
      <Head>
        <title>KarAIoki</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container pt={36} gap={10} display="flex" flexDirection="column" maxW="2xl">
        <Center>
          <Image src={'/logoWhite.svg'} width={600} height={200} alt="Xx_KarAIokI_xX"></Image>
        </Center>

        <Card>
          <Text>
            {`Our website uses ChatGPT's advanced language capabilities to generate endless possibilities of
            entertaining karaoke lyrics. Explore any topic from love ballads to rap battles and let your inner superstar
            shine with our AI technology.`}
          </Text>
          <Link href="/songSelect" style={{ width: '100%' }}>
            <Button
              colorScheme={'pink'}
              size="lg"
              fontSize="xl"
              width="full"
              bgColor="#ef3499"
              rightIcon={<ArrowForwardIcon />}
            >
              Play!
            </Button>
          </Link>
        </Card>
      </Container>
    </>
  );
}
