import { Box, Text, Button, VStack, HStack, Image, Spinner } from "@chakra-ui/react"
import { useParams, useNavigate } from "react-router-dom"
import { useGames } from "../features/games/hooks"

// Single game detail page showing comprehensive game information
const GameDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Fetch all games to find the one with matching ID
  const { data: games = [], isLoading } = useGames({})
  const game = games.find((g) => g.id === Number(id))

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" h="100%">
        <Spinner size="lg" />
      </Box>
    )
  }

  if (!game) {
    return (
      <VStack gap={4} p={8}>
        <Text fontSize="2xl" fontWeight="bold">
          Game not found
        </Text>
        <Button onClick={() => navigate("/games")}>Back to Games</Button>
      </VStack>
    )
  }

  return (
    <VStack gap={8} p={8} align="stretch">
      <Button onClick={() => navigate("/games")} alignSelf="flex-start">
        Back to Games
      </Button>

      <HStack gap={8} align="start">
        {game.background_image && (
          <Image
            src={game.background_image}
            alt={game.name}
            maxW="400px"
            borderRadius="lg"
          />
        )}

        <VStack align="start" gap={4} flex={1}>
          <Text fontSize="3xl" fontWeight="bold">
            {game.name}
          </Text>

          {game.metacritic && (
            <Box>
              <Text fontWeight="bold">Metacritic Score</Text>
              <Text fontSize="2xl">{game.metacritic}/100</Text>
            </Box>
          )}

          {game.parent_platforms && game.parent_platforms.length > 0 && (
            <Box>
              <Text fontWeight="bold" mb={2}>
                Available on:
              </Text>
              <HStack gap={2}>
                {game.parent_platforms.map((p) => (
                  <Text key={p.platform.id} bg="gray.700" px={3} py={1} borderRadius="md">
                    {p.platform.name}
                  </Text>
                ))}
              </HStack>
            </Box>
          )}
        </VStack>
      </HStack>
    </VStack>
  )
}

export default GameDetailPage
