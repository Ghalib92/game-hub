import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { GameGrid, GenreList, PlatformSelector } from "../features/games"
import { GameQuery } from "../shared/types"

// Main games browsing page with filters
const GamesPage = () => {
  const [gameQuery, setGameQuery] = useState<GameQuery>({})

  return (
    <Flex flex={1}>
      {/* Sidebar with genre filters */}
      <Box
        w="250px"
        bg="var(--sidebar-bg)"
        color="white"
        p={4}
        overflowY="auto"
      >
        <GenreList
          selectedGenre={gameQuery.genre ?? null}
          onSelectGenre={(genre) =>
            setGameQuery((prev) => ({ ...prev, genre }))
          }
        />
      </Box>

      {/* Main content */}
      <Box
        flex={1}
        p={8}
        bg="var(--bg-primary)"
        color="var(--text-primary)"
        overflowY="auto"
      >
      <HStack justify="space-between" mb={6}>
          <Text fontSize="2xl" fontWeight="bold">
            Games
          </Text>
          <PlatformSelector
            selectedPlatform={gameQuery.platform ?? null}
            onSelectPlatform={(platform) =>
              setGameQuery((prev) => ({ ...prev, platform }))
            }
          />
        </HStack>
        <GameGrid gameQuery={gameQuery} />
      </Box>
    </Flex>
  )
}

export default GamesPage
