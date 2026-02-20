import { memo, useEffect, useState } from "react"
import { Box, Center, Image, SimpleGrid, Spinner, Text } from "@chakra-ui/react"

interface FetchGamesResponse {
  id: number;
  name: string;
  background_image: string;
}

const GameGrid = () => {
  const [games, setGames] = useState<FetchGamesResponse[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true)
        const baseUrl = import.meta.env.VITE_RAWG_API_URL
        const apiKey = import.meta.env.VITE_RAWG_API_KEY
        const response = await fetch(`${baseUrl}/games?key=${apiKey}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setGames(data.results)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGames()
  }, [])

  if (isLoading) {
    return (
      <Center minH="40vh">
        <Spinner size="lg" />
      </Center>
    )
  }

  if (error) {
    return (
      <Box color="red.400" fontWeight="bold">
        {error}
      </Box>
    )
  }

  return (
    <SimpleGrid minChildWidth="220px" gap={6}>
      {games.map((game) => (
        <Box
          key={game.id}
          bg="var(--bg-secondary)"
          borderRadius="md"
          overflow="hidden"
          boxShadow="sm"
          _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
          transition="all 0.2s ease"
        >
          {game.background_image ? (
            <Image
              src={game.background_image}
              alt={game.name}
              height="150px"
              width="100%"
              objectFit="cover"
            />
          ) : (
            <Box height="150px" bg="gray.700" />
          )}
          <Box p={4}>
            <Text fontWeight="bold" lineClamp={2}>
              {game.name}
            </Text>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default memo(GameGrid)