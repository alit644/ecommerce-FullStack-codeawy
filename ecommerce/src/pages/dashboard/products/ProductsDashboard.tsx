import { Box, HStack, Flex, Text } from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import { BsFilterRight, BsPlus } from "react-icons/bs";
import { tableColumns } from "../../../data";
import { useAppDispatch, useAppSelector } from "../../../App/store";
import { lazy, Suspense, useEffect, useState } from "react";
import DrawerComponent from "../../../components/ui/Drawer";
import FilterSidebar from "../../../components/Filter";
import {
  openFilterDrawer,
  closeDialog,
} from "../../../App/features/globalSlice";
import { useProductFilters } from "../../../Hooks/useProductFilters";
import SearchQuery from "../../../components/SearchQuery";
import Error from "../../../components/Error/Error";
import MButton from "../../../components/ui/MButton";
import { Link } from "react-router";
const DialogAlert = lazy(() => import("../../../components/ui/Dialog"));
import {
  createProductApi,
  useDeleteProductMutation,
  useGetDashboardProductsQuery,
} from "../../../App/services/createProductApi";
import { toaster } from "../../../components/ui/toaster";
import { setPage } from "../../../App/features/paginationSlice";
import SortMenu from "../../../components/ui/SortMenu";
import ProductsTableRows from "../../../components/products/ProductsTableRows";
import TablePagination from "../../../components/ui/Table/TablePagination";

const ProductsDashboard = () => {
  const [value, setValue] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const [
    deleteProduct,
    { isLoading: isDeletingProduct, isSuccess: isProductDeleted },
  ] = useDeleteProductMutation();
  const documentId = useAppSelector((state) => state.global.id);
  const { page, pageSize } = useAppSelector((state) => state.pagination);
  const filtersSlice = useAppSelector((state) => state.filters);
  const isFilterDrawerOpen = useAppSelector(
    (state) => state.global.isFilterDrawerOpen
  );
  //! Handlers
  const { handleFilterChange, resetFilters } = useProductFilters();

  //! get data RTX Query =
  const { data, isLoading, isError, isFetching } = useGetDashboardProductsQuery(
    {
      page,
      pageSize,
      filters: filtersSlice,
      valueSort: value,
      query: searchQuery,
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const pageCount = data?.meta.pagination.pageCount;

  //** Prefetch
  const prefetch = createProductApi.usePrefetch("getDashboardProducts");
  useEffect(() => {
    if (page < (pageCount ?? 0)) {
      prefetch(
        {
          page: page + 1,
          pageSize,
          filters: filtersSlice,
          valueSort: value,
          query: searchQuery,
        },
        { ifOlderThan: 300 }
      );
    }
  }, [page, pageSize, filtersSlice, value, searchQuery]);

  const handleDeleteProduct = async () => {
    try {
      const result = await deleteProduct(documentId as string).unwrap();
      console.log("data", result);
      //? Toaster
      if (isProductDeleted) {
        toaster.success({
          title: "Product Deleted",
          description: "Product deleted successfully",
          duration: 2000,
          type: "success",
        });
      }
      dispatch(closeDialog());
      dispatch(setPage(1));
    } catch (error) {
      console.log("error", error);
      dispatch(closeDialog());
      toaster.error({
        title: "Product Delete Failed",
        description: "Product deleted failed",
        duration: 2000,
        type: "error",
      });
    }
  };


  if (isError) return <Error description="Something went wrong" />;

  return (
    <>
      <Box>
        <HStack alignItems="center" justifyContent="space-between">
          <MainTitle title="Products" isArrow={false} />
          <Link to="/dashboard/products/create">
            <MButton
              variant="solid"
              colorScheme="teal"
              bg={"teal.500"}
              _hover={{ bg: "teal.600" }}
              size="md"
              title="Add Product"
              icon={<BsPlus />}
            />
          </Link>
        </HStack>
        {/* Table and Sort */}
        <Box>
          <Flex
            mt={4}
            justifyContent="space-between"
            alignItems="center"
            gap={4}
          >
            {/* Search Query */}
            <SearchQuery setSearchQuery={setSearchQuery} />
            {/* Sort */}
            <SortMenu value={value} setValue={setValue} />
            {/* Filter */}
            <MButton
              variant="outline"
              size="md"
              title="Filter"
              icon={<BsFilterRight />}
              onClick={() => dispatch(openFilterDrawer())}
            />
          </Flex>
          {/* Table */}
          <TablePagination
            data={data?.data || []}
            isLoading={isLoading}
            isFetching={isFetching}
            columns={tableColumns}
            rows={<ProductsTableRows data={data?.data || []} />}
            count={data?.meta.pagination.total || 0}
            pageSize={pageSize}
            page={page}
          />
        </Box>
      </Box>
      {/* Filter Drawer */}
      <DrawerComponent
        title="Filter"
        action={false}
        isOpenDrawer={isFilterDrawerOpen}
      >
        <FilterSidebar
          filters={filtersSlice}
          handleFilterChange={handleFilterChange}
          resetFilters={resetFilters}
        />
      </DrawerComponent>

      {/* Dialog Alert */}
      <Suspense fallback={<div>Loading...</div>}>
        <DialogAlert
          title="Delete Product"
          action="Yes, Delete"
          onConfirm={handleDeleteProduct}
          loading={isDeletingProduct}
        >
          <Text fontSize={"md"}>
            Are you sure you want to delete this product?
          </Text>
        </DialogAlert>
      </Suspense>
    </>
  );
};

export default ProductsDashboard;
