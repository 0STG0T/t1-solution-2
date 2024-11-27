import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  Button,
  useDisclosure,
  useColorMode,
  Badge,
  useToken,
} from '@chakra-ui/react'
import { DragHandleIcon, SettingsIcon } from '@chakra-ui/icons'
import { NodeTypes } from './NodeTypes'

interface FlowItem {
  id: string
  type: 'input' | 'output' | 'process'
  label: string
}

const SortableItem = ({ id, type, label }: FlowItem) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const { colorMode } = useColorMode()
  const [brand500] = useToken('colors', ['brand.500'])

  const bgColor = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.600'
  const shadowColor = colorMode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.4)'

  const badgeColorScheme = {
    input: 'green',
    process: 'brand',
    output: 'purple'
  }

  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
      p={4}
      mb={2}
      rounded="xl"
      border="1px"
      cursor="move"
      bg={bgColor}
      borderColor={borderColor}
      boxShadow={`0 4px 6px ${shadowColor}`}
      _hover={{
        borderColor: brand500,
        transform: 'translateY(-2px)',
        boxShadow: `0 6px 8px ${shadowColor}`
      }}
      {...attributes}
      {...listeners}
    >
      <HStack gap={3}>
        <DragHandleIcon color="gray.400" />
        <Badge colorScheme={badgeColorScheme[type]} fontSize="sm" textTransform="capitalize">
          {type}
        </Badge>
        <Text flex={1} fontWeight="medium">{label}</Text>
        <IconButton
          aria-label="Settings"
          icon={<SettingsIcon />}
          size="sm"
          variant="ghost"
          color="gray.500"
          _hover={{ color: brand500 }}
        />
      </HStack>
    </Box>
  )
}

export const FlowEditor = () => {
  const [items, setItems] = useState<FlowItem[]>([
    { id: '1', type: 'input', label: 'User Input' },
    { id: '2', type: 'process', label: 'Process Message' },
    { id: '3', type: 'output', label: 'AI Response' }
  ])

  const handleAddNode = (type: string, label: string) => {
    const newId = (items.length + 1).toString()
    setItems([...items, {
      id: newId,
      type: type as FlowItem['type'],
      label
    }])
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box w="full">
      <HStack mb={6} justify="space-between">
        <Text fontSize="xl" fontWeight="bold" bgGradient="linear(to-r, brand.500, brand.600)" bgClip="text">
          Flow Editor
        </Text>
        <Button onClick={onOpen} leftIcon={<SettingsIcon />} variant="outline">
          Preview Flow
        </Button>
      </HStack>

      <NodeTypes onAddNode={handleAddNode} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <VStack align="stretch" gap={2}>
            {items.map((item) => (
              <SortableItem key={item.id} {...item} />
            ))}
          </VStack>
        </SortableContext>
      </DndContext>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" color="brand.500">Flow Preview</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" gap={4}>
              {items.map((item, index) => (
                <Box
                  key={index}
                  p={4}
                  rounded="xl"
                  border="1px"
                  borderColor="gray.200"
                  bg="white"
                  boxShadow="sm"
                >
                  <Badge mb={2} colorScheme={
                    item.type === 'input' ? 'green' :
                    item.type === 'process' ? 'brand' : 'purple'
                  }>
                    {item.type}
                  </Badge>
                  <Text fontWeight="medium">{item.label}</Text>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
