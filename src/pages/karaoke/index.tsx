//create the page here
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { Button, Input, HStack, Box} from '@chakra-ui/react';


export default function Karaoke() {
  return (
    <>
      <Button>Hello</Button>
        <HStack spacing= {3}>
        <Box >song search:</Box>
         <Input 
            placeholder="search"
            /> 
        </HStack>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '4rem',
          }}
        >
            <p>mode selection: </p>
            
        </div>

      
    </>
  );
}

//export the component to render it