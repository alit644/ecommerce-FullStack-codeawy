import {
  Box,
  HStack,
  Image,
  Table,
  Badge,
  IconButton,
  Button,
  Flex,
  Input,
  Menu,
} from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import { LuTrash2 } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { BsPlus } from "react-icons/bs";
import { sortItems, tableColumns } from "../../../data";
import TableComponent from "../../../components/ui/Table";
import type { IProductCard } from "../../../interfaces";
import PaginationComponent from "../../../components/ui/Pagination";
import { useAppDispatch, useAppSelector } from "../../../App/store";
import { HiSortAscending } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import MenuComponent from "../../../components/ui/Menu";
import { useState } from "react";
import DrawerComponent from "../../../components/ui/Drawer";
import FilterSidebar from "../../../components/Filter";
import { openFilterDrawer } from "../../../App/features/globalSlice";
import { useProducts } from "../../../Hooks/useProducts";
import { useProductFilters } from "../../../Hooks/useProductFilters";

//TODO: Add Search Functionality
//TODO: Add Skeleton Loader
//TODO: refactor code use qs
const ProductsDashboard = () => {
  const [value, setValue] = useState("asc");
  const dispatch = useAppDispatch();
  const { page, pageSize } = useAppSelector((state) => state.pagination);
  const filtersSlice = useAppSelector((state) => state.filters);
  const isFilterDrawerOpen = useAppSelector(
    (state) => state.global.isFilterDrawerOpen
  );
  //! Handlers
  const { handleFilterChange, resetFilters } = useProductFilters();

  //! Get Data
  const { data, isLoading, isError } = useProducts(filtersSlice, value);

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
          <IconButton aria-label="Delete" variant="ghost" colorScheme="red">
            <LuTrash2 />
          </IconButton>
        </HStack>
      </Table.Cell>
    </Table.Row>
  ));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <>
      <Box>
        <HStack alignItems="center" justifyContent="space-between">
          <MainTitle title="Products" isArrow={false} />
          <Button
            variant="solid"
            colorScheme="teal"
            bg={"teal.500"}
            _hover={{ bg: "teal.600" }}
          >
            <BsPlus />
            Add Product
          </Button>
        </HStack>
        {/* Table and Sort */}
        <Box>
          <Flex
            mt={4}
            justifyContent="space-between"
            alignItems="center"
            gap={4}
          >
            <form style={{ width: "100%" }}>
              <Box position="relative" w={"full"}>
                <Box
                  position="absolute"
                  left="10px"
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={1}
                >
                  <FaSearch size={16} color="#ccc" />
                </Box>
                <Input
                  type="search"
                  placeholder="Search products..."
                  pl="32px"
                  bg="white"
                  maxW={{ md: "86%", lg: "37%" }}
                  _placeholder={{ color: "gray.500" }}
                  borderColor="gray.200"
                  _focus={{
                    shadow: "0 0 4px 0 rgb(0, 128, 128)",
                    borderColor: "teal.500",
                  }}
                  borderRadius="md"
                />
              </Box>
            </form>
            {/* Sort */}
            <MenuComponent
              menuTrigger={
                <>
                  <HiSortAscending /> Sort
                </>
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
            <Button
              variant="outline"
              onClick={() => dispatch(openFilterDrawer())}
            >
              <HiSortAscending /> Filter
            </Button>
          </Flex>
          <TableComponent headers={renderTableHeaders} rows={renderTableRows} />

          {/* Pagination */}
          <PaginationComponent
            count={data?.meta.pagination.total || 0}
            pageSize={pageSize}
            page={page}
          />
        </Box>
      </Box>
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
    </>
  );
};

export default ProductsDashboard;
