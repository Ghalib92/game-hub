import { HStack, Icon } from "@chakra-ui/react"
import {
  Apple,
  Gamepad2,
  Globe,
  Laptop,
  Monitor,
  Smartphone,
  type LucideIcon,
} from "lucide-react"
import { Platform } from "../types"

interface Props {
  platforms: Platform[]
}

const iconMap: Record<string, LucideIcon> = {
  pc: Monitor,
  playstation: Gamepad2,
  xbox: Gamepad2,
  nintendo: Gamepad2,
  mac: Apple,
  ios: Smartphone,
  android: Smartphone,
  web: Globe,
  linux: Laptop,
}

const PlatformIconList = ({ platforms }: Props) => {
  return (
    <HStack gap={2} color="var(--text-secondary)">
      {platforms.map((platform) => {
        const IconComponent = iconMap[platform.slug]
        if (!IconComponent) return null
        return <Icon key={platform.id} as={IconComponent} boxSize={4} />
      })}
    </HStack>
  )
}

export default PlatformIconList
