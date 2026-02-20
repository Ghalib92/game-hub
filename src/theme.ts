import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        gray: {
          50: { value: "#f9fafb" },
          100: { value: "#f3f4f6" },
          200: { value: "#e5e7eb" },
          300: { value: "#d1d5db" },
          400: { value: "#9ca3af" },
          500: { value: "#6b7280" },
          600: { value: "#4b5563" },
          700: { value: "#374151" },
          800: { value: "#1f2937" },
          900: { value: "#111827" },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          default: { value: "{colors.gray.50}" },
          _dark: { value: "{colors.gray.900}" },
        },
        fg: {
          default: { value: "{colors.gray.900}" },
          _dark: { value: "{colors.gray.50}" },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "colors.bg",
      color: "colors.fg",
    },
  },
})

export const system = createSystem(defaultConfig, config)