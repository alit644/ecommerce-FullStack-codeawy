import { Container, Grid, Box, Flex } from "@chakra-ui/react";
import ProductCard from "../components/ui/ProductCard";
import PaginationComponent from "../components/ui/Pagination";
import { useAppSelector, useAppDispatch } from "../App/store";
import { ProductHeader } from "../components/products/ProductHeader";
import { ProductsGrid } from "../components/products/ProductsGrid";
import { useProducts } from "../Hooks/useProducts";
import Filter from "../components/Filter";
import type { IProductCard } from "../interfaces";
import { useCallback } from "react";
import { setPage } from "../App/features/paginationSlice";
import { resetFilter, setFilter } from "../App/features/filtersSlice";
const Shop = () => {
  const { page, pageSize } = useAppSelector((state) => state.pagination);
  const dispatch = useAppDispatch();
  const filtersSlice = useAppSelector((state) => state.filters);
  console.log(filtersSlice);

  const handleFilterChange = useCallback(
    (filter: string, value: string[]) => {
      dispatch(
        setFilter({
          ...filtersSlice,
          [filter]: value,
        })
      );

      dispatch(setPage(1));
    },
    [dispatch, filtersSlice]
  );
  const { data, isLoading, isError } = useProducts(filtersSlice);
  const total = data?.meta.pagination.total;

  //! Handler
  const resetFilters = useCallback(() => {
    dispatch(resetFilter());
    dispatch(setPage(1));
  }, [dispatch]);

  //! Render Data
  const renderProducts = () => {
    return data?.data.map((product: IProductCard) => (
      <ProductCard key={product.id} data={product} />
    ));
  };

  return (
    <Container maxW="container.xl" mt={6} mb={6}>
      <Flex gap={6}>
        {/* Filter */}
        <Filter
          filters={filtersSlice}
          handleFilterChange={handleFilterChange}
          resetFilters={resetFilters}
        />
        {/* Products Grid and Pagination */}
        <Flex direction="column" gap={6} w="full">
          <Box w="full" p={3}>
            <Grid templateColumns="300px 1fr" gap={6}>
              <ProductHeader totalProducts={total ?? 0} />

              {/* sort By */}
            </Grid>
            {/* Products Grid */}
            <ProductsGrid
              renderProducts={renderProducts() || []}
              totalProducts={total ?? 0}
              isLoading={isLoading}
              isError={isError}
            />
          </Box>

          {/* Pagination */}
          {total !== 0 && (
            <PaginationComponent
              count={total ?? 0}
              pageSize={pageSize}
              page={page}
            />
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Shop;
