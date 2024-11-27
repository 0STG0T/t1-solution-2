import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'assistant'}>>([])
  const [input, setInput] = useState('')
  const [ws, setWs] = useState<WebSocket | null>(null)
  const toast = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000/ws')

    websocket.onopen = () => {
      toast({
        title: 'Connected',
        description: 'Successfully connected to the chat server',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      })
    }

    websocket.onmessage = (event) => {
      setMessages(prev => [...prev, { text: event.data, sender: 'assistant' }])
    }

    websocket.onerror = () => {
      toast({
        title: 'Connection error',
        description: 'Failed to connect to the chat server',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }

    setWs(websocket)
    return () => {
      websocket.close()
    }
  }, [toast])

  const sendMessage = () => {
    if (input.trim() && ws?.readyState === WebSocket.OPEN) {
      ws.send(input)
      setMessages(prev => [...prev, { text: input, sender: 'user' }])
      setInput('')
    }
  }

  return (
    <Box
      w="full"
      h="600px"
      bg="white"
      rounded="lg"
      shadow="lg"
      display="flex"
      flexDirection="column"
    >
      <Box flex="1" p={4} overflowY="auto">
        <VStack align="stretch" gap={4}>
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              p={3}
              rounded="lg"
              maxW="80%"
              marginLeft={msg.sender === 'user' ? 'auto' : undefined}
              bg={msg.sender === 'user' ? 'blue.500' : 'gray.100'}
              color={msg.sender === 'user' ? 'white' : 'gray.800'}
            >
              <Text>{msg.text}</Text>
            </Box>
          ))}
          <Box ref={messagesEndRef} />
        </VStack>
      </Box>
      <Box p={4} borderTop="1px" borderColor="gray.200">
        <HStack gap={3}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            size="md"
            flex="1"
          />
          <Button
            onClick={sendMessage}
            colorScheme="blue"
            disabled={!ws || ws.readyState !== WebSocket.OPEN}
          >
            Send
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}
