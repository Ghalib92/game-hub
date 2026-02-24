import useData from "./useData"
import { Game, GameQuery } from "../../../shared/types"

// Fetch games with optional filters and search
// Query key includes all filter parameters so refetches happen on changes
const useGames = (gameQuery: GameQuery) => {
  const params = {
    genres: gameQuery.genre?.id,
    platforms: gameQuery.platform?.id,
    ordering: gameQuery.sortOrder,
    search: gameQuery.searchText,
  }

  return useData<Game>("/games", { params }, [
    "games",
    gameQuery.genre?.id,
    gameQuery.platform?.id,
    gameQuery.sortOrder,
    gameQuery.searchText,
  ])
}

export default useGames
