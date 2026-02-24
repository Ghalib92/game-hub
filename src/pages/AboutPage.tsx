import { Box, VStack, Text } from "@chakra-ui/react"

// About page with project information
const AboutPage = () => {
  return (
    <VStack gap={6} p={8} align="start" maxW="800px">
      <Text fontSize="3xl" fontWeight="bold">
        About Game Hub
      </Text>

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          What is Game Hub?
        </Text>
        <Text>
          Game Hub is a web application that lets you discover and browse thousands of games
          from various platforms. It uses the RAWG API to provide comprehensive game information
          including genres, platforms, ratings, and more.
        </Text>
      </Box>

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Features
        </Text>
        <Text as="ul" pl={4}>
          <li>Browse games with advanced filtering</li>
          <li>Filter by genre and gaming platform</li>
          <li>Search for specific games</li>
          <li>View detailed game information</li>
          <li>Light/dark theme support</li>
          <li>Save your favorite games</li>
        </Text>
      </Box>

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Technology Stack
        </Text>
        <Text>
          Built with React, TypeScript, TanStack React Query, Chakra UI, React Router,
          and powered by the RAWG Video Games Database API.
        </Text>
      </Box>
    </VStack>
  )
}

export default AboutPage
