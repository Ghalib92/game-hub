import { Box, Flex, Grid, GridItem, VStack, Text } from "@chakra-ui/react"
import NavBar from "./components/NavBar"

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
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <GridItem key={item}>
                <Box
                  bg="var(--bg-secondary)"
                  p={4}
                  borderRadius="md"
                  boxShadow="sm"
                  minH="250px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  color="var(--text-primary)"
                  _hover={{ boxShadow: "lg" }}
                >
                  <Text>Game {item}</Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Flex>
    </Flex>
  )
}

export default App
