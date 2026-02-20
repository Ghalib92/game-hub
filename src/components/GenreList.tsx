import { Box, Button, HStack, Spinner, Text, VStack } from "@chakra-ui/react"
import useGenres from "../hooks/useGenres"
import { Genre } from "../types"

interface Props {
  selectedGenre: Genre | null
  onSelectGenre: (genre: Genre) => void
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { data: genres, error, isLoading } = useGenres()

  if (error) return <Box color="red.400">{error}</Box>

  return (
    <VStack align="stretch" gap={2}>
      <HStack justifyContent="space-between">
        <Text fontSize="lg" fontWeight="bold">
          Genres
        </Text>
        {isLoading ? <Spinner size="sm" /> : null}
      </HStack>
      {genres.map((genre) => (
        <Button
          key={genre.id}
          justifyContent="flex-start"
          variant={genre.id === selectedGenre?.id ? "solid" : "ghost"}
          bg={genre.id === selectedGenre?.id ? "var(--sidebar-hover)" : "transparent"}
          _hover={{ bg: "var(--sidebar-hover)" }}
          onClick={() => onSelectGenre(genre)}
        >
          {genre.name}
        </Button>
      ))}
    </VStack>
  )
}

export default GenreList
