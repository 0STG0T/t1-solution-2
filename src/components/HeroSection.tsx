import { Box, Container, Heading, Text, Button, HStack, useColorModeValue } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { chakra } from '@chakra-ui/react'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
})

export const HeroSection = () => {
  const gradientText = useColorModeValue(
    'linear(to-r, brand.500, brand.600)',
    'linear(to-r, brand.400, brand.500)'
  )

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      py={{ base: 16, md: 24 }}
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      {/* Animated gradient sphere */}
      <MotionBox
        position="absolute"
        right={{ base: '-30%', md: '0%' }}
        top={{ base: '10%', md: '5%' }}
        width={{ base: '300px', md: '600px' }}
        height={{ base: '300px', md: '600px' }}
        borderRadius="full"
        bgGradient="radial(circle, rgba(66,153,225,0.4) 0%, rgba(99,179,237,0.1) 100%)"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        style={{
          transition: 'all 20s linear infinite'
        }}
        filter="blur(40px)"
        opacity={0.6}
      />

      <Container maxW="container.xl" position="relative">
        <Box maxW={{ base: '100%', md: '60%' }}>
          <Heading
            as="h1"
            size="2xl"
            mb={6}
            bgGradient={gradientText}
            bgClip="text"
            lineHeight="1.2"
          >
            Окно знаний:
            <br />
            цифровой ассистент базы знаний
          </Heading>

          <Text fontSize="xl" mb={8} color={useColorModeValue('gray.600', 'gray.300')}>
            Интеллектуальная система для работы с базами знаний. Поддержка различных форматов,
            интуитивный интерфейс и безопасность данных.
          </Text>

          <HStack spacing={4}>
            <Button
              size="lg"
              colorScheme="brand"
              rounded="xl"
              px={8}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Начать работу
            </Button>
            <Button
              size="lg"
              variant="outline"
              colorScheme="brand"
              rounded="xl"
              px={8}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Узнать больше
            </Button>
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}
