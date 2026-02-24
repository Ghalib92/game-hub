import { Box, Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { NavBar } from "../features/ui"

// Layout wrapper that maintains navbar and theme across all pages
const Layout = () => {
  return (
    <Flex direction="column" h="100vh" bg="var(--bg-primary)" color="var(--text-primary)">
      {/* Navigation bar */}
      <NavBar />

      {/* Page content */}
      <Box flex={1} overflow="auto">
        <Outlet />
      </Box>
    </Flex>
  )
}

export default Layout
