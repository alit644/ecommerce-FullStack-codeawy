import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Box, Grid, Icon, Text } from "@chakra-ui/react";
import { FaBoxOpen } from "react-icons/fa";
const CategoryCard = lazy(() => import("./ui/CategoryCard"));
import MainTitle from "./MainTitle";
import type { ICategory } from "../interfaces";
import { useBrowseByCategory } from "../Hooks/useBrowseByCategory";
import { useQueryClient } from "@tanstack/react-query";
import { fetchCategory } from "../utils/fetchingData";
import Error from "./Error/Error";
import SkeletonCard from "./ui/Skeleton";

const BrowseByCategory = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const pageSize = 6;

  const { data, isLoading, isFetching, error } = useBrowseByCategory({
    page,
    pageSize,
  });
  const pageCount = data?.meta?.pagination?.pageCount;

  //! ============== Handlers ==============
  //! Handel Next and Prev (Swiper)
  const onNext = useCallback(() => {
    if (page < pageCount) {
      setPage((prev) => prev + 1);
    }
  }, [page, pageCount]);
  const onPrev = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  //! ✅ prefetchQuery جلب المنتجات التالية عند تحميل الصفحة
  useEffect(() => {
    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["category", page + 1],
        queryFn: () => fetchCategory(page + 1, pageSize),
        staleTime: 1000 * 60 * 2, // 2 minutes
      });
    }
  }, [page, pageCount, queryClient]);

  //! ============== Render ==============
  //! Render Categories Data
  const renderCategory = data?.data.map((item: ICategory) => (
    <Suspense key={item.id} fallback={<SkeletonCard height="140px" />}>
      <CategoryCard
        title={item.title}
        thumbnail={{
          formats: {
            small: {
              url: `${import.meta.env.VITE_BASE_URL}${
                item.thumbnail?.formats?.small?.url
              }`,
            },
          },
        }}
      />
    </Suspense>
  ));

  if (isLoading || isFetching)
    return (
      <SkeletonCard
        count={6}
        noOfLines={1}
        isAction={false}
        height="140px"
        textSkeleton={true}
      />
    );
  if (error)
    return (
      <Error
        code={500}
        message="Error"
        description="Failed to fetch categories"
      />
    );

  if (data?.data?.length === 0)
    return (
      <Box
        w="full"
        h="200px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        p={6}
      >
        <Box
          w={12}
          h={12}
          bg="gray.100"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FaBoxOpen} color="gray.500" boxSize={6} />
        </Box>
        <Text mt={4} fontSize="xl" fontWeight="bold">
          No Products Found
        </Text>
        <Text mt={2} color="gray.500" textAlign="center">
          لا توجد منتجات في هذا القسم
        </Text>
      </Box>
    );
  return (
    <Box my={6}>
      <MainTitle
        title="Browse By Category"
        onNext={onNext}
        onPrev={onPrev}
        pageCount={pageCount}
        page={page}
      />

      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
        gap={6}
        mt={4}
      >
        {renderCategory}
      </Grid>
    </Box>
  );
};

export default BrowseByCategory;
