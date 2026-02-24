import { Box, Text } from "@chakra-ui/react"

// Search results page - shows filtered game results
const SearchResultsPage = () => {
  return (
    <Box p={8}>
      <Text fontSize="3xl" fontWeight="bold">
        Search Results
      </Text>
      <Text color="var(--text-secondary)" mt={4}>
        Search results will appear here based on your search query.
      </Text>
    </Box>
  )
}

export default SearchResultsPage
