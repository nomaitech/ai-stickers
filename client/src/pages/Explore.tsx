import { Box, Grid, AbsoluteCenter, Heading, Image } from "@chakra-ui/react";
import PrimaryButton from '@/components/PrimaryButton';
import Section from '@/components/Section';
import { useDiscoverStickersQuery } from '@/store/mainApi';
import type { DiscoverStickersResponse } from '@/types';
const Explore = () => {
  const { data: stickers, isLoading } = useDiscoverStickersQuery();
  console.log(stickers);
  return (
    <>
        <Section>
            <Heading size="4xl" mr={2}>Discover what others are creating</Heading>
        </Section>
        {isLoading ? (
            <AbsoluteCenter>
                <PrimaryButton text="Loading..." />
            </AbsoluteCenter>
        ) : (
            <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={8}>
                {stickers?.map((sticker: DiscoverStickersResponse) => (
                    <Box key={sticker.id} bg="gray.50" borderRadius="xl" borderWidth="1px" borderStyle="solid" borderColor="gray.200" p={2}>
                        <Image src={sticker.generated_img_url} w="full" h="full" />
                    </Box>
                ))}
            </Grid>
        )}
    </>
  )
}

export default Explore;