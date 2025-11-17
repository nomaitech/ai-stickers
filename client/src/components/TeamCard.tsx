import { Card, Image, Text, Box } from "@chakra-ui/react"

type TeamCardProps = {
    imageSource: string,
    imageBgColor: string,
    name: string,
    position: string,
    funFact: string
}

const TeamCard = ({ imageSource, imageBgColor, name, position, funFact }: TeamCardProps) => {
    return (
        <Card.Root my={8}>
            <Card.Body p={0}>
                <Image src={imageSource} alt="Placeholder" backgroundColor={imageBgColor} padding={6}/>
                <Box ml={8} pt={4}>
                    <Card.Title my="2" color="orange.400" fontSize="xl">{name}</Card.Title>
                    <Card.Description>
                        <Text fontWeight="semibold" color="black">{position}</Text>
                    </Card.Description>
                    <Card.Description>
                        {funFact}
                    </Card.Description>
                </Box>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
            </Card.Footer>
        </Card.Root>)
}

export default TeamCard