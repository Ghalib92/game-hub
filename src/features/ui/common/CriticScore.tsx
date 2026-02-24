import { Box } from "@chakra-ui/react"

interface Props {
  score: number
}

// Display critic score with color coding based on value
const CriticScore = ({ score }: Props) => {
  const getScoreColor = (value: number) => {
    if (value > 80) return "#16a34a" // Green for excellent
    if (value > 60) return "#f59e0b" // Amber for good
    return "#ef4444" // Red for poor
  }

  return (
    <Box
      bg={getScoreColor(score)}
      color="white"
      fontWeight="bold"
      fontSize="sm"
      px={2}
      py={1}
      borderRadius="md"
    >
      {score}
    </Box>
  )
}

export default CriticScore
