import { Box, VStack, Text, Button } from "@chakra-ui/react"

// Favorites page - shows saved favorite games
const FavoritesPage = () => {
  const favorites = [] // Placeholder for future favorites feature

  return (
    <VStack gap={8} p={8} align="center">
      <Text fontSize="3xl" fontWeight="bold">
        My Favorites
      </Text>

      {favorites.length === 0 ? (
        <Box textAlign="center">
          <Text fontSize="lg" color="var(--text-secondary)" mb={4}>
            You haven't added any favorites yet.
          </Text>
          <Button colorScheme="blue">Browse Games</Button>
        </Box>
      ) : (
        <Box>
          {/* Render favorites grid here */}
        </Box>
      )}
    </VStack>
  )
}

export default FavoritesPage
