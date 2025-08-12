import { useCallback, useEffect, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";

import CategoryCard from "./ui/CategoryCard";
import MainTitle from "./MainTitle";
import type { ICategory } from "../interfaces";
import { useBrowseByCategory } from "../Hooks/useBrowseByCategory";
import { useQueryClient } from "@tanstack/react-query";
import { fetchCategory } from "../utils/fetchingData";
import Error from "./Error/Error";
import SkeletonCard from "./ui/Skeleton";
import NoResult from "./ui/NoResult";

const BrowseByCategory = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);

  const pageSize = 3;

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
    <CategoryCard
      key={item?.id}
      title={item?.title}
      thumbnail={{
        formats: {
          small: {
            url: `${import.meta.env.VITE_BASE_URL}${
              item?.thumbnail?.formats?.small?.url
            }`,
          },
        },
      }}
    />
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
      status={404}
      message="Oops! Page not found."
      />
    );

  if (data?.data?.length === 0)
    return (
      <NoResult title="No Categories Found" description="Try adjusting your filters or search criteria"/>
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
