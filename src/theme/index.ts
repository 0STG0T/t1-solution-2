import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f1ff',
      100: '#b3d4ff',
      200: '#80b7ff',
      300: '#4d9aff',
      400: '#1a7dff',
      500: '#0066ff', // Primary brand color
      600: '#0052cc',
      700: '#003d99',
      800: '#002966',
      900: '#001433',
    },
  },
  fonts: {
    heading: 'Inter, -apple-system, system-ui, sans-serif',
    body: 'Inter, -apple-system, system-ui, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        px: 3,
        py: 1,
        fontWeight: 'medium',
      },
    },
    Box: {
      baseStyle: {
        borderRadius: 'lg',
        transition: 'all 0.2s',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
})

export default theme
