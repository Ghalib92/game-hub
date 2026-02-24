import { Box, VStack, Text, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

// Home page - landing/dashboard view
const HomePage = () => {
  const navigate = useNavigate()

  return (
    <VStack gap={8} p={8} align="stretch">
      <Box>
        <Text fontSize="4xl" fontWeight="bold" mb={4}>
          Welcome to Game Hub
        </Text>
        <Text fontSize="lg" color="var(--text-secondary)">
          Discover and explore thousands of games from across all platforms.
          Filter by genre, platform, and search for your favorite titles.
        </Text>
      </Box>
      <Button
        colorScheme="blue"
        size="lg"
        onClick={() => navigate("/games")}
        alignSelf="flex-start"
      >
        Browse Games
      </Button>
    </VStack>
  )
}

export default HomePage
