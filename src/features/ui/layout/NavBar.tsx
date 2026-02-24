import { memo } from "react"
import { Box, Flex, HStack } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { ThemeToggle, SearchInput } from "../common"

interface Props {
  onSearch?: (searchText: string) => void
}

// Application header with logo, navigation, search, and theme toggle
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
      <RouterLink to="/" style={{ fontSize: "lg", fontWeight: "bold" }}>
        Game Hub
      </RouterLink>
      <Box flex={1} maxW="600px">
        {onSearch && <SearchInput onSearch={onSearch} />}
      </Box>
      <HStack gap={4}>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/games">Games</RouterLink>
        <RouterLink to="/favorites">Favorites</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <ThemeToggle />
      </HStack>
    </Flex>
  )
}

export default memo(NavBar)
