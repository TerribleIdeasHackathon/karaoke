import { Box, Center } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface KaraokeLyricsCard {
  children?: ReactNode;
}

export default function KaraokeLyricsCard({ children }: KaraokeLyricsCard) {
  return (
    <Box bgColor="gray.200" px={10} py={5} rounded={10}>
      <Center>{children}</Center>
    </Box>
  );
}
