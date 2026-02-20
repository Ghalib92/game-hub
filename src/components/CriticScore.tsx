import { Box } from "@chakra-ui/react"

interface Props {
  score: number
}

const CriticScore = ({ score }: Props) => {
  const getScoreColor = (value: number) => {
    if (value > 80) return "#16a34a"
    if (value > 60) return "#f59e0b"
    return "#ef4444"
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
