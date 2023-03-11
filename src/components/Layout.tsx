import { Box, Container, IconButton } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { ArrowBackIcon } from '@chakra-ui/icons';

interface LayoutProps {
  children?: ReactNode;
  backLink?: string;
}

export default function Layout({ children, backLink }: LayoutProps) {
  return (
    <Box width="full" px={10} py={5}>
      <Header>
        {backLink !== undefined ? (
          <Link href={backLink}>
            <IconButton aria-label="Go back to home" title="Go back to home" icon={<ArrowBackIcon />} />
          </Link>
        ) : null}
      </Header>
      <Container>{children}</Container>
    </Box>
  );
}