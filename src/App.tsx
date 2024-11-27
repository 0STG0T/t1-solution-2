import {
  ChakraProvider,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Box,
} from '@chakra-ui/react'
import { Layout } from './components/Layout'
import { ChatInterface } from './components/ChatInterface'
import { FlowEditor } from './components/FlowEditor'
import { HeroSection } from './components/HeroSection'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import theme from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <HeroSection />
        <Box
          bg="white"
          rounded="xl"
          shadow="lg"
          p={6}
          borderWidth="1px"
          borderColor="gray.100"
        >
          <Tabs
            variant="soft-rounded"
            colorScheme="brand"
            size="lg"
          >
            <TabList mb={4}>
              <Tab
                _selected={{
                  color: 'white',
                  bg: 'brand.500',
                }}
                fontWeight="medium"
              >
                Чат
              </Tab>
              <Tab
                _selected={{
                  color: 'white',
                  bg: 'brand.500',
                }}
                fontWeight="medium"
              >
                Редактор процессов
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <ChatInterface />
              </TabPanel>
              <TabPanel px={0}>
                <FlowEditor />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Layout>
    </ChakraProvider>
  )
}

export default App
