import { Center } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SongSelectCardProps {
  children?: ReactNode;
}

export default function SongSelectCard({ children }: SongSelectCardProps) {
  return (
    <Center
      bg="#131416c2"
      borderRadius="10px"
      paddingX="80px"
      paddingY="30px"
      width="600px"
      gap="15px"
      justifyContent={'center'}
      flexDirection="column"
    >
      {children}
    </Center>
  );
}
