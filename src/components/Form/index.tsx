import { useEffect, useState } from 'react';
import { InputMask } from 'react-input-mask';
import {
  Flex,
  Input,
  Grid,
  Box,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
  FormControl,
  FormLabel,
  Button,
  Textarea,
  Select,
  HStack,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { RiPhoneFill } from 'react-icons/ri';
import { SubmitHandler, useForm } from 'react-hook-form';
import { api } from '../../api';
import { motion } from 'framer-motion';

type handlePostFormProps = {
  userReporter: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  location: {
    address: string;
    neighborhood: string;
    city: string;
    referencePoints: string;
    additionalLocationInfo: string;
  };
  numberOfPeople: number;
  isThereVisibleShelter: number;
  isThereWomen: number;
  isThereChildren: number;
  isThereThermalProtectionFromCold: number;
  medicalCareNeedsDescription: string;
  urgencyLevel: number;
};

export function Form() {
  const router = useRouter();

  const regExEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const toast = useToast();

  const { register, handleSubmit, formState } = useForm<handlePostFormProps>();

  const [isNextFormOpen, setIsNextFormOpen] = useState(false);

  const createToast = (errorMessage, toastStatus) => {
    toast({
      title: 'Aviso',
      description: errorMessage,
      status: toastStatus,
      duration: 5000,
      isClosable: true,
    });
  };

  const validateForm = async (values) => {
    if (!values.userReporter.name || values.userReporter.name.length === 0) {
      createToast('Preencha o nome.', 'error');
      setIsNextFormOpen(false);
      return false;
    }

    if (!values.userReporter.email || values.userReporter.email.length === 0) {
      createToast('O e-mail é obrigatório.', 'error');
      setIsNextFormOpen(false);
      return false;
    }

    if (values.userReporter.email.length > 0) {
      if (regExEmail.test(values.userReporter.email) === false) {
        createToast('O e-mail preenchido é inválido.', 'error');
        setIsNextFormOpen(false);
        return false;
      }
    }

    if (!values.location.address || values.location.address === 0) {
      createToast(
        'Preencha o endereço (mesmo que seja um endereço aproximado).',
        'error'
      );
      setIsNextFormOpen(true);
      return false;
    }

    return true;
  };

  const handlePostForm: SubmitHandler<handlePostFormProps> = async (values) => {
    values.isThereChildren = Number(values.isThereChildren);
    values.isThereWomen = Number(values.isThereWomen);
    values.isThereThermalProtectionFromCold = Number(
      values.isThereThermalProtectionFromCold
    );
    values.urgencyLevel = Number(values.urgencyLevel);
    values.numberOfPeople = Number(values.numberOfPeople);
    values.isThereVisibleShelter = Number(values.isThereVisibleShelter);

    
    if (!(await validateForm(values))) return;

    api
      .post('', values)
      .then((response) => {
        console.log(response);
        createToast('Informe registrado com sucesso!', 'success');
        router.push('/home');
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data) {
          createToast(error.response.data.message, 'error');
        }
      });
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(handlePostForm)}
      w="100%"
      maxWidth={1480}
      mx="auto"
      mt="4"
      px="6"
    >
      {isNextFormOpen === false && (
        <Box>
          <Text fontSize="2xl" fontWeight="bold" my="8" textAlign="center">
            Cadastrar pessoas em vulnerabilidade
          </Text>
          <SimpleGrid columns={[1, 1, 2]} gap={6}>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">Nome</FormLabel>
              <Input
                placeholder="Digite seu nome"
                borderColor="gray.900"
                _hover={{ textDecoration: 'none' }}
                {...register('userReporter.name')}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">Email</FormLabel>
              <Input
                placeholder="Digite seu email"
                borderColor="gray.900"
                _hover={{ textDecoration: 'none' }}
                {...register('userReporter.email')}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">Telefone</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                >
                  <Icon as={RiPhoneFill} color="gray.600" />
                </InputLeftElement>
                <Input
                  placeholder="Digite seu telefone"
                  borderColor="gray.900"
                  _hover={{ textDecoration: 'none' }}
                  {...register('userReporter.phoneNumber')}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">Endereço</FormLabel>
              <Input
                placeholder="Digite seu endereço"
                borderColor="gray.900"
                _hover={{ textDecoration: 'none' }}
                {...register('location.address')}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">Bairro</FormLabel>
              <Input
                placeholder="Bairro"
                borderColor="gray.900"
                _hover={{ textDecoration: 'none' }}
                {...register('location.neighborhood')}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">Cidade</FormLabel>
              <Input
                placeholder="Sua cidade"
                borderColor="gray.900"
                _hover={{ textDecoration: 'none' }}
                {...register('location.city')}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">Ponto de referência</FormLabel>
              <Input
                placeholder="Um ponto de referência que ajude a localizar o local."
                borderColor="gray.900"
                _hover={{ textDecoration: 'none' }}
                {...register('location.referencePoints')}
              />
            </FormControl>
          </SimpleGrid>
          <FormControl marginTop="5">
            <FormLabel color="red.600" fontWeight="bold">
              Informações adicionais do local
            </FormLabel>
            <Textarea
              borderColor="gray.900"
              placeholder="Descreva aqui observações do local em que você está"
              size="sm"
              {...register('location.additionalLocationInfo')}
              borderRadius={6}
            />
          </FormControl>

          <Flex justify="center">
            <Button
              onClick={() => setIsNextFormOpen(true)}
              my="8"
              bg="red.600"
              color="white"
              w="80%"
              _hover={{ bg: 'red.400' }}
              fontSize="2xl"
              h="12"
            >
              Avançar
            </Button>
          </Flex>
        </Box>
      )}
      {isNextFormOpen && (
        <Box>
          <Text fontSize="2xl" fontWeight="semi-bold" my="8" textAlign="center">
            Cenário encontrado
          </Text>
          <SimpleGrid columns={[1, 1, 2]} gap={6}>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">Quantidade de pessoas</FormLabel>
              <Input
                min="1"
                max="20"
                placeholder="Digite a quantidade de pessoas no local"
                borderColor="gray.900"
                type="number"
                _hover={{ textDecoration: 'none' }}
                {...register('numberOfPeople')}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">
                As pessoas identificadas possuem abrigo ?
              </FormLabel>
              <Select
                {...register('isThereVisibleShelter')}
                borderColor="gray.900"
              >
                <option value="0">Sim</option>
                <option value="1">Não</option>
                <option value="2">Não consegui identificar</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">
                Há alguém do sexo feminino :
              </FormLabel>
              <Select {...register('isThereWomen')} borderColor="gray.900">
                <option value="0">Sim</option>
                <option value="1">Nao</option>
                <option value="2">Nao consegui identificar</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">Existem crianças no local ?</FormLabel>
              <Select {...register('isThereChildren')} borderColor="gray.900">
                <option value="0">Sim</option>
                <option value="1">Nao</option>
                <option value="2">Nao consegui identificar</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">
                Necessitam de proteção térmica ?
              </FormLabel>
              <Select
                {...register('isThereThermalProtectionFromCold')}
                borderColor="gray.900"
              >
                <option value="0">Sim</option>
                <option value="1">Nao</option>
                <option value="2">Nao consegui identificar</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel color="red.600" fontWeight="bold">Nível de urgência</FormLabel>
              <Select
                borderColor="gray.900"
                _hover={{ textDecoration: 'none' }}
                {...register('urgencyLevel')}
              >
                <option value="0">Baixo</option>
                <option value="1">Médio</option>
                <option value="2">Alto</option>
              </Select>
            </FormControl>
          </SimpleGrid>
          <FormControl marginTop="5">
            <FormLabel color="red.600" fontWeight="bold">Situação no geral</FormLabel>
            <Textarea
              {...register('medicalCareNeedsDescription')}
              borderColor="gray.900"
              placeholder="Descreva aqui observações relavantes das pessoas que você observou"
              size="sm"
              borderRadius={6}
            />
          </FormControl>

          <Flex my="5" flexDirection={['column', 'column', 'column', 'row']}>
            <Button
              w={['100%', '100%', '100%', '60%']}
              bg="gray.200"
              borderColor="red.600"
              borderWidth="thin"
              color="red.600"
              onClick={() => setIsNextFormOpen(false)}
              _hover={{ bg: 'red.100' }}
              fontSize="2xl"
              h="12"
              mr="2"
              mb={['2', '2', '2', '0']}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              w={['100%', '100%', '100%', '60%']}
              bg="red.600"
              color="white"
              _hover={{ bg: 'red.400' }}
              fontSize="2xl"
              h="12"
              isLoading={formState.isSubmitting}
            >
              Salvar
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
