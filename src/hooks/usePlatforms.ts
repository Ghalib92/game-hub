import useData from "./useData"
import { Platform } from "../types"

const usePlatforms = () =>
  useData<Platform>("/platforms/lists/parents", undefined, ["/platforms/lists/parents"])

export default usePlatforms
