import { Box, Flex, Grid, GridItem, VStack, Text } from "@chakra-ui/react"
import NavBar from "./components/NavBar"

function App() {
  return (
    <Flex flexDirection="column" h="100vh">
      {/* NavBar */}
      <NavBar />

      {/* Main Layout */}
      <Flex flex={1}>
        {/* Sidebar */}
        <Box w="250px" bg="gray.800" color="white" p={4}>
          <VStack align="stretch" gap={4}>
            <Text fontSize="lg" fontWeight="bold">
              Menu
            </Text>
            <Box p={3} bg="gray.700" borderRadius="md" cursor="pointer">
              Home
            </Box>
            <Box p={3} bg="gray.700" borderRadius="md" cursor="pointer">
              Games
            </Box>
            <Box p={3} bg="gray.700" borderRadius="md" cursor="pointer">
              Favorites
            </Box>
            <Box p={3} bg="gray.700" borderRadius="md" cursor="pointer">
              Settings
            </Box>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex={1} p={8} bg="gray.50" overflowY="auto">
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <GridItem key={item}>
                <Box
                  bg="white"
                  p={4}
                  borderRadius="md"
                  boxShadow="sm"
                  minH="250px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
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
