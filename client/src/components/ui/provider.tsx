"use client"

import { ChakraProvider } from "@chakra-ui/react"

import { ColorModeProvider } from "./color-mode"
import type { ThemeProviderProps } from "./color-mode-types"
import customTheme from "./customTheme"

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={customTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
