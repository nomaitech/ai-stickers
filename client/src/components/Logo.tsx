import { Heading, Link, Center } from "@chakra-ui/react"

const Logo = () => {
    return (
        <Link textDecoration="none" _hover={{ textDecoration: 'none' }} href="/generate-sticker">
            <Center h="38px" w="175px">
                <Heading size="sm" bgGradient="to-r" gradientFrom="purple.400" gradientVia="pink.400" gradientTo="orange.400" bgClip='text' fontWeight="semibold">Create Stickers Online</Heading>
            </Center>
        </Link>
    )
}

export default Logo