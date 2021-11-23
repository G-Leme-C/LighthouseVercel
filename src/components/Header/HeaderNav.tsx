import {
  Flex,
  Text,
  HStack,
  Box,
  Avatar,
  useBreakpointValue,
  IconButton,
  Icon,
  Stack,
} from '@chakra-ui/react';
import {
  RiNotificationLine,
  RiUserAddLine,
  RiDashboardLine,
  RiListUnordered,
  RiServiceLine,
  RiMenuLine,
} from 'react-icons/ri';
import Image from 'next/image';
import { useHeaderDrawer } from '../../context/HeaderContextDrawer';
import Link from 'next/link';
import { ActiveLink } from '../ActiveLink';

export function HeaderNav() {
  const { onOpen, isOpen } = useHeaderDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Flex
      w="100%"
      as="header"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6"
      flexDirection={['column', 'row']}
      justify="space-between"
    >
      <Image
        src="/lighthouse.png"
        height="95px"
        width="130px"
        alt="Logo lighthouse(Farol)"
      />
      <Stack ml={[0, '20']}>
        <Flex
          mx="auto"
          align={['left', 'center']}
          flexDirection={['column', 'row']}
        >
          <Flex align="center" margin="4">
            <Icon color="red.600" as={RiDashboardLine} mr="1" fontSize="md" />
            <ActiveLink href="/home">
              <Text
                fontSize="xl"
                fontWeight="bold"
                cursor="pointer"
                _hover={{ color: 'red.500' }}
              >
                Home
              </Text>
            </ActiveLink>
          </Flex>
          <Flex align="center" margin="4">
            <Icon color="red.600" as={RiListUnordered} mr="1" fontSize="md" />
            <ActiveLink href="/">
              <Text
                fontSize="xl"
                fontWeight="bold"
                cursor="pointer"
                _hover={{ color: 'red.500' }}
              >
                Cadastrar vulnerabilidade
              </Text>
            </ActiveLink>
          </Flex>
          <Flex align="center" margin="4">
            <Icon color="red.600" as={RiServiceLine} mr="1" fontSize="md" />
            <ActiveLink href="/partners">
              <Text
                fontSize="xl"
                fontWeight="bold"
                cursor="pointer"
                _hover={{ color: 'red.500' }}
              >
                Parceiros
              </Text>
            </ActiveLink>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
}
