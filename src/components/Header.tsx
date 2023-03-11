import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <Box width="full" px={10} py={5}>
      {children}
    </Box>
  );
}
