import { useState } from 'react';
import {
  Box,
  Divider,
  Stack,
  useBreakpointValue,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { Form } from '../components/Form';
import { Header } from '../components/Header';
import { useHeaderDrawer } from '../context/HeaderContextDrawer';
import { RiMenuLine } from 'react-icons/ri';
import { DrawerIcon } from '../components/DrawerIcon';
import Head from 'next/head';

export default function Home() {
  return (
    <>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <title>Lighthouse - Cadastrar pessoas em vulnerabilidade</title>
    </Head>
    <Box
      maxWidth="90%"
      borderRadius="lg"
      borderWidth="1px"
      bg="gray.100"
      mx="auto"
      mt="10"
      boxShadow="dark-lg"
      minHeight="90vh"
    >
      <DrawerIcon />
      <Header />
      <Box>
        <Form />
      </Box>
    </Box>
    </>
  );
}
