import { ReactNode } from 'react'
import {
  Box,
  Button,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
  useColorModeValue,
  HStack,
  Spacer,
  Link
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Logo } from './Logo'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const containerWidth = useBreakpointValue({
    base: '100%',
    sm: 'container.sm',
    md: 'container.md',
    lg: 'container.lg',
    xl: 'container.xl'
  })

  const bgGradient = useColorModeValue(
    'linear(to-b, gray.50, gray.100)',
    'linear(to-b, gray.900, gray.800)'
  )

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      <Box
        borderBottomWidth="1px"
        borderColor={useColorModeValue('gray.100', 'gray.700')}
        bg={useColorModeValue('white', 'gray.800')}
        position="sticky"
        top="0"
        zIndex="sticky"
        backdropFilter="blur(12px)"
      >
        <Container maxW={containerWidth} py={4}>
          <HStack spacing={8}>
            <Logo />
            <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
                  Решения
                </MenuButton>
                <MenuList>
                  <MenuItem>Для предприятий</MenuItem>
                  <MenuItem>Для образования</MenuItem>
                  <MenuItem>Для здравоохранения</MenuItem>
                </MenuList>
              </Menu>
              <Link href="#" fontWeight="medium">Шаблоны</Link>
              <Link href="#" fontWeight="medium">Документация</Link>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
                  Ресурсы
                </MenuButton>
                <MenuList>
                  <MenuItem>Блог</MenuItem>
                  <MenuItem>Обучение</MenuItem>
                  <MenuItem>Поддержка</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            <Spacer />
            <HStack spacing={4}>
              <Button variant="ghost" colorScheme="brand">Войти</Button>
              <Button colorScheme="brand">Начать</Button>
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Container maxW={containerWidth} py={{ base: 6, md: 12 }}>
        {children}
      </Container>
    </Box>
  )
}
