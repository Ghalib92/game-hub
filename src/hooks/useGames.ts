import useData from "./useData"
import { Game, GameQuery } from "../types"

const useGames = (gameQuery: GameQuery) => {
  // RAWG expects ids and search text in query params.
  const params = {
    genres: gameQuery.genre?.id,
    platforms: gameQuery.platform?.id,
    ordering: gameQuery.sortOrder,
    search: gameQuery.searchText,
  }

  return useData<Game>("/games", { params }, [
    "/games",
    gameQuery.genre?.id,
    gameQuery.platform?.id,
    gameQuery.sortOrder,
    gameQuery.searchText,
  ])
}

export default useGames
