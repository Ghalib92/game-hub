import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { NavBar } from "./features/ui"
import { GameGrid, GenreList, PlatformSelector } from "./features/games"
import { GameQuery } from "./shared/types"

function App() {
  // GameQuery drives all filters and search for the grid.
  const [gameQuery, setGameQuery] = useState<GameQuery>({})

  return (
    <Flex flexDirection="column" h="100vh" bg="var(--bg-primary)" color="var(--text-primary)">
      {/* NavBar */}
      <NavBar
        onSearch={(searchText) =>
          setGameQuery((prev) => ({ ...prev, searchText }))
        }
      />

      {/* Main Layout */}
      <Flex flex={1}>
        {/* Sidebar */}
        <Box 
          w="250px" 
          bg="var(--sidebar-bg)" 
          color="white" 
          p={4}
        >
          <GenreList
            selectedGenre={gameQuery.genre ?? null}
            onSelectGenre={(genre) =>
              setGameQuery((prev) => ({ ...prev, genre }))
            }
          />
        </Box>

        {/* Main Content */}
        <Box 
          flex={1} 
          p={8} 
          bg="var(--bg-primary)" 
          color="var(--text-primary)"
          overflowY="auto"
        >
          <HStack justifyContent="space-between" mb={6}>
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
    </Flex>
  )
}

export default App
