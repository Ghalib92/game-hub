import { Box, HStack, Spinner, Text } from "@chakra-ui/react"
import usePlatforms from "../hooks/usePlatforms"
import { Platform } from "../types"

interface Props {
  selectedPlatform: Platform | null
  onSelectPlatform: (platform: Platform | null) => void
}

const PlatformSelector = ({ selectedPlatform, onSelectPlatform }: Props) => {
  const { data: platforms, error, isLoading } = usePlatforms()

  if (error) return <Box color="red.400">{error}</Box>

  return (
    <HStack gap={2} alignItems="center">
      <Text fontWeight="bold">Platform</Text>
      {isLoading ? <Spinner size="sm" /> : null}
      <select
        value={selectedPlatform?.id ?? ""}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          const id = Number(event.target.value)
          const platform = platforms.find((p) => p.id === id) || null
          onSelectPlatform(platform)
        }}
        style={{
          maxWidth: "200px",
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
          borderRadius: "8px",
          padding: "8px 12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <option value="">All</option>
        {platforms.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>
    </HStack>
  )
}

export default PlatformSelector
