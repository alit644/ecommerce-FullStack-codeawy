import { Container, Grid, Box, Flex } from "@chakra-ui/react";
import ProductCard from "../components/ui/ProductCard";
import PaginationComponent from "../components/ui/Pagination";
import { useAppSelector, useAppDispatch } from "../App/store";
import { ProductHeader } from "../components/products/ProductHeader";
import { ProductsGrid } from "../components/products/ProductsGrid";
import { useProducts } from "../Hooks/useProducts";
import Filter from "../components/Filter";
import type { IProductCard } from "../interfaces";
import { useCallback, useState } from "react";
import { setPage } from "../App/features/paginationSlice";
import { resetFilter, setFilter } from "../App/features/filtersSlice";
import DrawerComponent from "../components/ui/Drawer";
import { closeDrawer } from "../App/features/globalSlice";
const Shop = () => {
  const { page, pageSize } = useAppSelector((state) => state.pagination);
  const dispatch = useAppDispatch();
  const filtersSlice = useAppSelector((state) => state.filters);
  const [localFilters, setLocalFilters] = useState(filtersSlice);

  const handleFilterChange = useCallback(
    (filter: string, value: string[]) => {
      // TODO: Generate Path From Filters

      dispatch(
        setFilter({
          ...filtersSlice,
          [filter]: value,
        })
      );

      dispatch(setPage(1));
      // TODO: Generate Path From Filters
      // const newPath = generateStrapiQuery({
      //   ...filtersSlice,
      //   [filter]: value,
      // });
      // navigate(newPath, { replace: true });
    },
    [dispatch, filtersSlice]
  );

  const handleLocalFilterChange = useCallback(
    (filter: string, value: string[]) => {
      setLocalFilters((prev) => ({
        ...prev,
        [filter]: value,
      }));
    },
    [setLocalFilters]
  );

  const { data, isLoading, isError } = useProducts(filtersSlice);
  const total = data?.meta.pagination.total;

  //!: Handler
  const resetFilters = useCallback(() => {
    setLocalFilters(filtersSlice);
    dispatch(resetFilter());
    // TODO: Generate Path From Filters
    // const path = generateStrapiQuery(filtersSlice);
    // navigate(path, { replace: true });
    dispatch(setPage(1));
  }, [dispatch, filtersSlice]);

  const onConfirmDrawer = () => {
    dispatch(closeDrawer());
    // filter change
    dispatch(setPage(1));
    // TODO: Generate Path From Filters
    // const path = generateStrapiQuery(filtersSlice);
    // navigate(path, { replace: true });
    dispatch(
      setFilter({
        ...filtersSlice,
        ...localFilters,
      })
    );
  };

  //!: Render Data
  const renderProducts = () => {
    return data?.data.map((product: IProductCard) => (
      <ProductCard key={product.id} data={product} />
    ));
  };

  return (
    <Container maxW="container.xl" mt={6} mb={6}>
      <Flex gap={6}>
        <Box display={{ base: "none", lg: "block" }} w="full" maxW="280px">
          {/* Filter */}
          <Filter
            filters={filtersSlice}
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
          />
        </Box>
        {/* Drawer Filter */}
        <DrawerComponent title="Filter" onConfirm={onConfirmDrawer}>
          <Filter
            filters={localFilters}
            handleFilterChange={handleLocalFilterChange}
            resetFilters={resetFilters}
          />
        </DrawerComponent>
        {/* Products Grid and Pagination */}
        <Flex direction="column" gap={6} w="full">
          <Box w="full" p={3}>
            <Grid gap={6} w="full">
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
