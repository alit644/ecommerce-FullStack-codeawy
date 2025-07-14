import { Container, Grid, Box, Flex, Heading, Badge } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../components/ui/Skeleton";
import ProductCard from "../components/ui/ProductCard";
import type { IProductCard } from "../interfaces";
import PaginationComponent from "../components/ui/Pagination";
import { useAppSelector } from "../App/store";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchProducts } from "../utils/fetchingData";
const Shop = () => {
  const { page, pageSize } = useAppSelector((state) => state.pagination);
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", "pagination", page, pageSize],
    queryFn: () => fetchProducts(page, pageSize),
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 60 * 2, // 2 minutes
    placeholderData: (prev) => prev,
  });
  const pageCount = data?.meta.pagination.pageCount;

  //! ✅ prefetchQuery جلب المنتجات التالية عند تحميل الصفحة
  useEffect(() => {
    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["products", "pagination", page + 1],
        queryFn: () => fetchProducts(page + 1, pageSize),
        staleTime: 1000 * 60 * 2, // 2 minutes
      });
    }
  }, [page, pageCount, pageSize, queryClient]);

  //! Render Data
  const renderProducts = () => {
    return data?.data.map((product: IProductCard) => (
      <ProductCard key={product.id} data={product} />
    ));
  };

  if (isLoading) return <Skeleton height="200px" />;
  if (isError) return <div>Error</div>;

  return (
    <Container maxW="container.xl" mt={6} mb={6}>
      <Flex gap={6}>
        {/* Filter */}
        {/* <Filter /> */}
        {/* Products Grid and Pagination */}
        <Flex direction="column" gap={6} w="full">
          <Box w="full" p={3}>
            <Grid templateColumns="300px 1fr" gap={6}>
              <Box w="full">
                <Heading fontSize="2xl" as="h2" fontWeight="bold">
                  Selected Products{" "}
                  <Badge colorPalette="teal">
                    {data?.meta.pagination.total}
                  </Badge>
                </Heading>
              </Box>
              {/* sort By */}
            </Grid>
            {/* Products */}
            <Box w="full" p={3}>
              <Grid
                templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
                gap={6}
              >
                {renderProducts()}
              </Grid>
            </Box>
          </Box>
          {/* Pagination */}
          <PaginationComponent
            count={data?.meta.pagination.total}
            pageSize={pageSize}
            page={page}
          />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Shop;
