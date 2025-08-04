import {
  Box,
  HStack,
  Image,
  Table,
  Badge,
  IconButton,
  Flex,
  Menu,
  Text,
} from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import { LuTrash2 } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { BsFilterRight, BsPlus } from "react-icons/bs";
import { sortItems, tableColumns } from "../../../data";
import TableComponent from "../../../components/ui/Table";
import type { IProductCard } from "../../../interfaces";
import PaginationComponent from "../../../components/ui/Pagination";
import { useAppDispatch, useAppSelector } from "../../../App/store";
import { HiSortAscending } from "react-icons/hi";
import MenuComponent from "../../../components/ui/Menu";
import { useEffect, useState } from "react";
import DrawerComponent from "../../../components/ui/Drawer";
import FilterSidebar from "../../../components/Filter";
import {
  openDialog,
  openFilterDrawer,
  closeDialog,
} from "../../../App/features/globalSlice";
import { useProductFilters } from "../../../Hooks/useProductFilters";
import SearchQuery from "../../../components/SearchQuery";
import NoResult from "../../../components/ui/NoResult";
import Error from "../../../components/Error/Error";
import TableSkeleton from "../../../components/ui/TableSkeleton";
import MButton from "../../../components/ui/Button";
import { Link } from "react-router";
import DialogAlert from "../../../components/ui/Dialog";
import {
  createProductApi,
  useDeleteProductMutation,
  useGetDashboardProductsQuery,
} from "../../../App/services/createProductApi";
import { toaster } from "../../../components/ui/toaster";
import { setPage } from "../../../App/features/paginationSlice";

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
  const { data, isLoading, isError , isFetching } = useGetDashboardProductsQuery(
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
    // prev page 
    if (page > 1) {
     prefetch(
       { page: page - 1, pageSize, filters: filtersSlice, valueSort: value, query: searchQuery },
       { ifOlderThan: 300 }
     );
   }
  }, [page, pageSize, filtersSlice, value, searchQuery]);

  const handleOpenDialog = (id: string) => {
   dispatch(openDialog(id));
 };

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
     dispatch(closeDialog())
     toaster.error({
       title: "Product Delete Failed",
       description: "Product deleted failed",
       duration: 2000,
       type: "error",
     });

   }
 };


  //! Render
  const renderTableHeaders = tableColumns.map((header) => (
    <Table.ColumnHeader key={header.key} color={"gray.500"}>
      {header.label}
    </Table.ColumnHeader>
  ));

  const renderTableRows = data?.data.map((product: IProductCard) => (
    <Table.Row key={product.id}>
      <Table.Cell>
        <Image
          loading="lazy"
          src={`${import.meta.env.VITE_BASE_URL}${product.thumbnail?.url}`}
          alt={product.title}
          w={50}
          h={50}
        />
      </Table.Cell>
      <Table.Cell>{product.id}</Table.Cell>
      <Table.Cell>{product.title}</Table.Cell>
      <Table.Cell>{product.category?.title}</Table.Cell>
      <Table.Cell>{product.price}</Table.Cell>
      <Table.Cell>{product.stock}</Table.Cell>
      <Table.Cell>
        <Badge
          colorPalette={
            product.stock !== undefined && product.stock > 0 ? "green" : "red"
          }
        >
          {product.stock !== undefined && product.stock > 0
            ? "Active"
            : "Out of Stock"}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <HStack>
          <IconButton aria-label="Edit" variant="ghost" colorScheme="blue">
            <TbEdit />
          </IconButton>
          <IconButton
            onClick={() => handleOpenDialog(product.documentId)}
            aria-label="Delete"
            variant="ghost"
            colorScheme="red"
          >
            <LuTrash2 />
          </IconButton>
        </HStack>
      </Table.Cell>
    </Table.Row>
  ));

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
            <MenuComponent
              menuTrigger={
                //
                <Flex
                  alignItems="center"
                  fontWeight={"medium"}
                  color={"gray.800"}
                  _hover={{ bg: "gray.100" }}
                  gap={2}
                  cursor="pointer"
                  bg="white"
                  border={"1px solid #e4e4e7"}
                  p={"7px 15px"}
                  borderRadius="md"
                >
                  <HiSortAscending size={20} /> Sort
                </Flex>
              }
            >
              <Menu.RadioItemGroup
                value={value}
                onValueChange={(e) => setValue(e.value)}
              >
                {sortItems.map((item) => (
                  <Menu.RadioItem key={item.value} value={item.value}>
                    {item.label}
                    <Menu.ItemIndicator />
                  </Menu.RadioItem>
                ))}
              </Menu.RadioItemGroup>
            </MenuComponent>
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
          {data?.data.length === 0 ? (
            <NoResult />
          ) : isLoading || isFetching ? (
            <TableSkeleton />
          ) : (
            <TableComponent
              headers={renderTableHeaders}
              rows={renderTableRows}
            />
          )}

          {/* Pagination */}
          {data?.meta.pagination.total !== undefined &&
            data?.meta.pagination.total > 0 && (
              <PaginationComponent
                count={data?.meta.pagination.total || 0}
                pageSize={pageSize}
                page={page}
              />
            )}
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
    </>
  );
};

export default ProductsDashboard;
