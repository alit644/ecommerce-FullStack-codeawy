import { Box, Grid } from "@chakra-ui/react";
import CategoryCard from "./ui/CategoryCard";
import MainTitle from "./MainTitle";
import type { ICategory } from "../interfaces";
import { useCallback, useEffect, useState } from "react";
import { useBrowseByCategory } from "../Hooks/useBrowseByCategory";
import Skeleton from "./ui/Skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { fetchCategory } from "../utils/fetchCategory";
// TODO: Skeleton تعديل
const BrowseByCategory = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const pageSize = 2;

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
      title={item.title}
      thumbnail={{
        formats: {
          small: {
            url: `${import.meta.env.VITE_BASE_URL}${
              item.thumbnail.formats.small.url
            }`,
          },
        },
      }}
    />
  ));

  if (isLoading || isFetching) return <Skeleton height="180px" />;
  if (error) return <div>Error fetching products</div>;
  if (data?.data?.length === 0) return <div>لا توجد منتجات في هذا القسم</div>;
  return (
    <Box my={6}>
      {/* main title and arrow */}
      <MainTitle
        title="Browse By Category"
        onNext={onNext}
        onPrev={onPrev}
        pageCount={pageCount}
        page={page}
      />

      {/* Categories grid */}
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
        gap={6}
        mt={4}

        // templateColumns={"repeat(auto-fill, minmax(200px, 1fr))"} gap={6} mt={4}
      >
        {renderCategory}
      </Grid>
    </Box>
  );
};

export default BrowseByCategory;
