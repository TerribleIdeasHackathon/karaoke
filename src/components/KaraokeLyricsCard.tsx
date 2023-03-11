import { Box, Center } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface KaraokeLyricsCard {
  children?: ReactNode;
}

export default function KaraokeLyricsCard({ children }: KaraokeLyricsCard) {
  return (
    <Box
      bgColor="gray.200"
      display={'flex'}
      px={10}
      py={10}
      minH={'64'}
      rounded={10}
      justifyContent={'center'}
      alignItems="center"
    >
      <Box
        fontSize={'xl'}
        fontWeight={'semibold'}
        textAlign={'center'}
        justifyContent={'center'}
        alignItems="center"
        height="full"
      >
        {children}
      </Box>
    </Box>
  );
}
