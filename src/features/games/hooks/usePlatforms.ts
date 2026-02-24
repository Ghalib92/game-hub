import useData from "./useData"
import { Platform } from "../../../shared/types"

// Fetch available platforms (PC, PlayStation, Xbox, etc.)
const usePlatforms = () =>
  useData<Platform>("/platforms/lists/parents", undefined, ["platforms"])

export default usePlatforms
