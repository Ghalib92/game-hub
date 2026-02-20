import { Text } from "@chakra-ui/react"

interface Props {
  score: number
}

const Emoji = ({ score }: Props) => {
  if (score > 85) return <Text fontSize="xl">🤩</Text>
  if (score > 70) return <Text fontSize="xl">😃</Text>
  if (score > 50) return <Text fontSize="xl">🙂</Text>
  return <Text fontSize="xl">😐</Text>
}

export default Emoji
