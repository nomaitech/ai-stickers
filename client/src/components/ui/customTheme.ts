import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    globalCss: {
        '::selection': {
            bg: 'orange.300',
            color: 'white',
        },
    },
    theme: {
        recipes: {
            input: {
                base: {
                    _focusVisible: {
                        borderColor: "orange.300",
                        boxShadow: "0 0 0 1px var(--chakra-colors-orange-300)",
                        focusRingColor: "orange.300",
                    },
                },
            },
            numberInput: {
                base: {
                    _focusVisible: {
                        borderColor: "orange.300",
                        boxShadow: "0 0 0 1px {colors.orange.300}",
                    },
                },
            },
            select: {
                base: {
                    _focusVisible: {
                        borderColor: "orange.300",
                        boxShadow: "0 0 0 1px {colors.orange.300}",
                    },
                },
            },
            textarea: {
                base: {
                    _focusVisible: {
                        borderColor: "orange.300",
                        boxShadow: "0 0 0 1px {colors.orange.300}",
                        focusRingColor: "orange.300",
                    },
                },
            },
            link: {
                base: {
                    _focusVisible: {
                        borderColor: "orange.300",
                        boxShadow: "0 0 0 1px {colors.orange.300}",
                        focusRingColor: "orange.300",
                    },
                    _focus: {
                        focusRingColor: "orange.300",
                    }
                },
            }
        },
    },
})

const customTheme = createSystem(defaultConfig, config);
export default customTheme; 