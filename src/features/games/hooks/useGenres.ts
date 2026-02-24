import useData from "./useData"
import { Genre } from "../../../shared/types"

// Fetch available game genres for filtering
const useGenres = () => useData<Genre>("/genres", undefined, ["genres"])

export default useGenres
