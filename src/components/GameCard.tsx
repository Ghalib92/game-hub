import { Box, HStack, Image, Text } from "@chakra-ui/react"
import { Game } from "../types"
import PlatformIconList from "./PlatformIconList"
import CriticScore from "./CriticScore"
import Emoji from "./Emoji"

interface Props {
  game: Game
}

const GameCard = ({ game }: Props) => {
  const platforms = game.parent_platforms?.map((p) => p.platform) ?? []

  return (
    <Box
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
          height="180px"
          width="100%"
          objectFit="cover"
        />
      ) : (
        <Box height="180px" bg="gray.700" />
      )}
      <Box p={4}>
        <HStack justifyContent="space-between" mb={2}>
          <PlatformIconList platforms={platforms} />
          {game.metacritic ? <CriticScore score={game.metacritic} /> : null}
        </HStack>
        <HStack justifyContent="space-between">
          <Text fontWeight="bold" lineClamp={2}>
            {game.name}
          </Text>
          {game.metacritic ? <Emoji score={game.metacritic} /> : null}
        </HStack>
      </Box>
    </Box>
  )
}

export default GameCard
