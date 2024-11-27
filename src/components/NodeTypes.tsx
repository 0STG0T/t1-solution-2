import { useState } from 'react'
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Stack,
  Select,
  FormControl,
  FormLabel,
  useToken,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

interface NodeTypesProps {
  onAddNode: (type: string, label: string) => void
}

export const NodeTypes = ({ onAddNode }: NodeTypesProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newNodeType, setNewNodeType] = useState('input')
  const [newNodeLabel, setNewNodeLabel] = useState('')
  const [brand500] = useToken('colors', ['brand.500'])

  const handleAddNode = () => {
    if (newNodeLabel.trim()) {
      onAddNode(newNodeType, newNodeLabel)
      setNewNodeLabel('')
      onClose()
    }
  }

  return (
    <Box mb={6}>
      <Button
        onClick={onOpen}
        colorScheme="brand"
        variant="outline"
        width="full"
        leftIcon={<AddIcon />}
        _hover={{
          bg: 'brand.50',
          borderColor: 'brand.500',
          transform: 'translateY(-1px)',
          boxShadow: 'sm'
        }}
        transition="all 0.2s"
      >
        Add Node
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader color="brand.500">Add New Node</ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Node Type</FormLabel>
                <Select
                  value={newNodeType}
                  onChange={(e) => setNewNodeType(e.target.value)}
                  focusBorderColor={brand500}
                >
                  <option value="input">Input</option>
                  <option value="process">Process</option>
                  <option value="output">Output</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Node Label</FormLabel>
                <Input
                  value={newNodeLabel}
                  onChange={(e) => setNewNodeLabel(e.target.value)}
                  placeholder="Enter node label"
                  focusBorderColor={brand500}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              onClick={handleAddNode}
              isDisabled={!newNodeLabel.trim()}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
