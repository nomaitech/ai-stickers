import Section from "@/components/Section";
import { Heading, Highlight, Box } from "@chakra-ui/react";
import TeamCard from "@/components/TeamCard";
import Jon from "@/assets/team/Jon.png";
import Carlos from "@/assets/team/Carlos.png";
import Itziar from "@/assets/team/Itziar.png";

const Team = () => {
    return (
        <Section>
            <Heading size="4xl">
                <Highlight query="The Team" styles={{ bgGradient: "to-r", gradientFrom: "purple.400", gradientTo: "blue.400", bgClip: 'text', fontWeight: "semibold" }}>
                    Meet The Team
                </Highlight>
            </Heading>
            <Box px={12}>
                <TeamCard imageSource={Jon} imageBgColor="red.50" name="Jon Besga" position="Team Lead" funFact="Having an existential crisis" />
                <TeamCard imageSource={Carlos} imageBgColor="cyan.50" name="Carlos Borja" position="Front End Engineer" funFact="100% achiever in Silksong" />
                <TeamCard imageSource={Itziar} imageBgColor="green.50" name="Itziar Cantero" position="Back End Engineer & Design" funFact="Craft enthusiast and book addict" />
            </Box>
        </Section>
    )
}

export default Team;