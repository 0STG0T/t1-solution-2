import { Box } from '@chakra-ui/react'

export const Logo = () => {
  return (
    <Box
      as="svg"
      width="40px"
      height="40px"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="url(#gradient)"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M14 20L18 24L26 16"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="gradient"
          x1="0"
          y1="0"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--chakra-colors-brand-500)" />
          <stop offset="100%" stopColor="var(--chakra-colors-brand-600)" />
        </linearGradient>
      </defs>
    </Box>
  )
}
