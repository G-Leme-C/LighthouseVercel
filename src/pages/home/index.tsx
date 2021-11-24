import { Header } from '../../components/Header';
import {
  Box,
  Text,
  Flex,
  Stack,
  Checkbox,
  HStack,
  SimpleGrid,
  Spinner,
  Tag,
  TagLabel
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import { DrawerIcon } from '../../components/DrawerIcon';
import Head from 'next/head';

export default function Home() {
  const [occurrences, setOccurrences] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderUrgencyLevel = ['Baixo', 'Médio', 'Alto'];
  const urgencyLevelColor = ['blue', 'yellow', 'red'];

  useEffect(() => {
    try {
      setLoading(true);
      api.get('').then((response) => setOccurrences(response.data));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Box
      maxWidth="90%"
      borderRadius="lg"
      borderWidth="1px"
      bg="gray.200"
      mx="auto"
      mt="10"
      boxShadow="dark-lg"
      minHeight="90vh"
    >
      <Head>
        <title>Lighthouse - Área do Parceiro</title>
      </Head>
      
      <DrawerIcon />
      <Header />

      <Flex
        w="100%"
        maxWidth={1480}
        mx="auto"
        mt="4"
        px="6"
        align="center"
        flexDirection="column"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Casos cadastrados
        </Text>
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
          />
        )}
        <SimpleGrid marginY="6" spacing="8" columns={[1, 3]}>
          {occurrences.map((occurrence, index) => (
            <Box
              w="auto"
              minWidth={100}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg="gray.100"
              h="auto"
              p="6"
              key={index}
            >
              <Stack spacing="1" marginBottom="3">
                <Text fontWeight="bold" fontSize="18">Dados do informante:</Text>
                <Text fontWeight="bold">
                  Nome: <Text display="inline" fontWeight="light">{occurrence.userReporter.name}</Text>
                </Text>
                <Text fontWeight="bold">
                  Email: <Text display="inline" fontWeight="light">{occurrence.userReporter.email}</Text>
                </Text>
                <Text fontWeight="bold">
                  Telefone: <Text display="inline" fontWeight="light">{occurrence.userReporter.phoneNumber}</Text>
                </Text>
              </Stack>
              <Box width="auto" h="1" bg="gray.300" rounded="lg"/>
              <Stack spacing="1" marginBottom="3" marginTop="3">
                <Text fontWeight="bold" fontSize="18">Local:</Text>
                <Text fontWeight="bold">
                  Cidade: <Text display="inline" fontWeight="light">{occurrence.location.city}</Text>
                </Text>
                <Text fontWeight="bold">
                  Bairro: <Text display="inline" fontWeight="light">{occurrence.location.address}</Text>
                </Text>
                <Text fontWeight="bold">
                  Rua:{' '}
                  <Text display="inline" fontWeight="light">{occurrence.location.addressAproximateNumber}</Text>
                </Text>
                <Text fontWeight="bold">
                  Ponto de referência :{' '}
                  <Text display="inline" fontWeight="light">{occurrence.location.referencePoints}</Text>
                </Text>
              </Stack>
              <Box width="auto" h="1" bg="gray.300" rounded="lg"/>
              <Stack spacing="1" marginBottom="3" marginTop="3">
                <Text fontWeight="bold" fontSize="18"></Text>
                <Text fontWeight="bold">
                  Quantidade de pessoas :{' '}
                  <Text Text display="inline" fontWeight="light" color="red.500">
                    {occurrence.numberOfPeople}
                  </Text>
                </Text>
                <Text fontWeight="bold">
                  Crianças no local :{' '}
                  <Text Text display="inline" fontWeight="light" color="red.500">
                    {occurrence.isThereChildren === 0 ? 'Não' : 'Sim'}
                  </Text>
                </Text>
                <Text fontWeight="bold">
                  Nível de urgência :{' '}
                  <Tag size="lg" colorScheme={urgencyLevelColor[occurrence.urgencyLevel]}>
                    <TagLabel fontWeight="bold">
                      {renderUrgencyLevel[occurrence.urgencyLevel]}
                    </TagLabel>
                    
                  </Tag>
                </Text>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
}
