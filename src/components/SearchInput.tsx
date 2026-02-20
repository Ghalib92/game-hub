import { Box, Button, HStack, Input } from "@chakra-ui/react"
import { Search } from "lucide-react"
import { useRef } from "react"

interface Props {
  onSearch: (searchText: string) => void
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <Box
      as="form"
      onSubmit={(event) => {
        event.preventDefault()
        if (ref.current) onSearch(ref.current.value)
      }}
      width="100%"
    >
      <HStack gap={2}>
        <Input ref={ref} placeholder="Search games..." />
        <Button type="submit" leftIcon={<Search size={16} />}>
          Search
        </Button>
      </HStack>
    </Box>
  )
}

export default SearchInput
