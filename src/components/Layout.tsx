import { Box, Container, IconButton } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { ArrowBackIcon } from '@chakra-ui/icons';

interface LayoutProps {
  children?: ReactNode;
  backLink?: string;
  ariaLabel?: string;
}

export default function Layout({ children, backLink, ariaLabel }: LayoutProps) {
  return (
    <Box width="full" px={10} py={5}>
      <Header>
        {backLink !== undefined && ariaLabel !== undefined ? (
          <Link href={backLink}>
            <IconButton aria-label={ariaLabel} title={ariaLabel} icon={<ArrowBackIcon />} />
          </Link>
        ) : null}
      </Header>
      <Container maxW={'2xl'}>{children}</Container>
    </Box>
  );
}
