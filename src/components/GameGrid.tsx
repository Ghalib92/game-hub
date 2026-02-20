import { memo } from "react"
import { Box, Center, SimpleGrid, Spinner } from "@chakra-ui/react"
import useGames from "../hooks/useGames"
import { GameQuery } from "../types"
import GameCard from "./GameCard"

interface Props {
  gameQuery: GameQuery
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data: games, error, isLoading } = useGames(gameQuery)
  const skeletons = Array.from({ length: 12 }, (_, index) => index)

  if (error) {
    return (
      <Box color="red.400" fontWeight="bold">
        {error}
      </Box>
    )
  }

  return (
    <Box>
      {isLoading ? (
        <Center mb={4}>
          <Spinner size="lg" />
        </Center>
      ) : null}
      <SimpleGrid minChildWidth="220px" gap={6}>
        {isLoading
          ? skeletons.map((id) => (
              <Box key={id} className="skeleton-card">
                <Box className="skeleton-image" />
                <Box className="skeleton-text" />
              </Box>
            ))
          : games.map((game) => <GameCard key={game.id} game={game} />)}
      </SimpleGrid>
    </Box>
  )
}

export default memo(GameGrid)