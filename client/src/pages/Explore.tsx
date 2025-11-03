import { useEffect, useMemo, useState } from "react";
import { Box, Grid, AbsoluteCenter, Heading, Image, Text, VStack } from "@chakra-ui/react";
import PrimaryButton from '@/components/PrimaryButton';
import Section from '@/components/Section';
import { useDiscoverStickersQuery } from '@/store/mainApi';
import type { DiscoverStickersResponse } from '@/types';

const PAGE_SIZE = 20;

const Explore = () => {
  const [page, setPage] = useState(1);
  const [stickers, setStickers] = useState<DiscoverStickersResponse[]>([]);

  const { data, isLoading, isFetching, isError } = useDiscoverStickersQuery({ page, page_size: PAGE_SIZE });

  useEffect(() => {
    if (!data) return;

    setStickers((prev) => {
      if (data.page === 1) {
        return data.items;
      }

      const existingIds = new Set(prev.map((sticker) => sticker.id));
      const newItems = data.items.filter((item) => !existingIds.has(item.id));
      return [...prev, ...newItems];
    });
  }, [data]);

  const isInitialLoading = useMemo(() => isLoading && page === 1, [isLoading, page]);
  const isLoadingMore = useMemo(() => isFetching && page > 1, [isFetching, page]);
  const canLoadMore = data?.has_next ?? false;

  const handleLoadMore = () => {
    if (!canLoadMore || isLoadingMore) return;
    setPage((prev) => prev + 1);
  };

  return (
    <>
        <Section>
            <Heading size="4xl" mr={2}>Discover what others are creating</Heading>
        </Section>
        {isInitialLoading ? (
            <AbsoluteCenter>
                <PrimaryButton text="Loading..." disabled />
            </AbsoluteCenter>
        ) : stickers.length === 0 ? (
            <AbsoluteCenter>
                <VStack gap={4}>
                    <Text fontSize="lg" color="gray.500">No public stickers yet. Be the first to share!</Text>
                    <PrimaryButton text="Create a sticker" to="/generate-sticker" />
                </VStack>
            </AbsoluteCenter>
        ) : (
            <>
                {isError && (
                    <Box mb={4} padding={4} backgroundColor="red.50" borderRadius="lg" borderWidth="1px" borderColor="red.200">
                        <Text color="red.600">We couldn't load new stickers right now. Please try again.</Text>
                    </Box>
                )}
                <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={8}>
                    {stickers.map((sticker) => (
                        <Box key={sticker.id} bg="gray.50" borderRadius="xl" borderWidth="1px" borderStyle="solid" borderColor="gray.200" p={2}>
                            <Image src={sticker.generated_img_url} w="full" h="full" />
                        </Box>
                    ))}
                </Grid>
                {canLoadMore && (
                    <Box mt={10} display="flex" justifyContent="center">
                        <PrimaryButton
                            text="Load more"
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            loading={isLoadingMore}
                            maxW="xs"
                        />
                    </Box>
                )}
            </>
        )}
    </>
  )
}

export default Explore;