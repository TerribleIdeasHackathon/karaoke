import { Flex, Text } from '@chakra-ui/react';

export interface SongMetadataProps {
  songName: string | null;
  artist: string | null;
}

export default function SongMetadata({ songName, artist }: SongMetadataProps) {
  return (
    <Flex gap={1} flexDirection="row">
      <Text as="span" fontWeight="bold">
        {songName}
      </Text>
      <Text as="span">{artist}</Text>
    </Flex>
  );
}
