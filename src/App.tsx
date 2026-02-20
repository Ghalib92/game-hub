import { Box, Flex, VStack, Text } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import GameGrid from "./components/GameGrid"

function App() {
  return (
    <Flex flexDirection="column" h="100vh" bg="var(--bg-primary)" color="var(--text-primary)">
      {/* NavBar */}
      <NavBar />

      {/* Main Layout */}
      <Flex flex={1}>
        {/* Sidebar */}
        <Box 
          w="250px" 
          bg="var(--sidebar-bg)" 
          color="white" 
          p={4}
          _hover={{}}
        >
          <VStack align="stretch" gap={4}>
            <Text fontSize="lg" fontWeight="bold">
              Menu
            </Text>
            <Box 
              p={3} 
              bg="var(--sidebar-hover)" 
              borderRadius="md" 
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
            >
              Home
            </Box>
            <Box 
              p={3} 
              bg="var(--sidebar-hover)" 
              borderRadius="md" 
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
            >
              Games
            </Box>
            <Box 
              p={3} 
              bg="var(--sidebar-hover)" 
              borderRadius="md" 
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
            >
              Favorites
            </Box>
            <Box 
              p={3} 
              bg="var(--sidebar-hover)" 
              borderRadius="md" 
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
            >
              Settings
            </Box>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box 
          flex={1} 
          p={8} 
          bg="var(--bg-primary)" 
          color="var(--text-primary)"
          overflowY="auto"
        >
          <GameGrid />
        </Box>
      </Flex>
    </Flex>
  )
}

export default App
