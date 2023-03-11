import { CenterProps } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface CardProps extends CenterProps {
  children?: ReactNode;
}

export default function Card({ children, ...centerProps }: CardProps) {
  return (
    <Center
      bg="#131416c2"
      borderRadius="10px"
      paddingX="80px"
      paddingY="30px"
      gap={5}
      justifyContent="center"
      flexDirection="column"
      {...centerProps}
    >
      {children}
    </Center>
  );
}
