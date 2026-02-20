import { memo } from "react"
import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import ThemeToggle from "./ThemeToggle"
import SearchInput from "./SearchInput"

interface Props {
  onSearch: (searchText: string) => void
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <Flex
      as="nav"
      padding="1.5rem"
      backgroundColor="var(--sidebar-bg)"
      color="white"
      alignItems="center"
      gap={6}
    >
      <Text fontSize="lg" fontWeight="bold">
        Game Hub
      </Text>
      <Box flex={1} maxW="600px">
        <SearchInput onSearch={onSearch} />
      </Box>
      <HStack gap={4}>
        <a href="#home">Home</a>
        <a href="#games">Games</a>
        <a href="#about">About</a>
        <ThemeToggle />
      </HStack>
    </Flex>
  )
}

export default memo(NavBar)