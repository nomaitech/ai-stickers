"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

import {
  ColorModeProvider,
} from "./color-mode"
import type { ThemeProviderProps } from "./color-mode-types"

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
