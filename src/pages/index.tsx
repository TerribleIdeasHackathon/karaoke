import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { Container } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>KarAIoki</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div
          className={styles.center}
          style={{
            fontFamily: 'monospace',
            fontSize: '6rem',
          }}
        >
          Xx_KarAIokI_xX
        </div>

        <Link
          style={{
            fontFamily: 'monospace',
            fontSize: '6rem',
            backgroundColor: '#ef3499',
            padding: '1rem 3rem',
            borderRadius: '1rem',
            marginTop: '1rem',
          }}
          href="/songSelect"
        >
          Play!
        </Link>
      </Container>
    </>
  );
}
