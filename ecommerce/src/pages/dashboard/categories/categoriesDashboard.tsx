import {
  Box,
  HStack,
  Image,
  Table,
  IconButton,
  Flex,
  Menu,
  Text,
} from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import { LuTrash2 } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { BsPlus } from "react-icons/bs";
import { sortItems, tableCategoryColumns } from "../../../data";
import TableComponent from "../../../components/ui/Table";
import PaginationComponent from "../../../components/ui/Pagination";
import { useAppDispatch, useAppSelector } from "../../../App/store";
import { HiSortAscending } from "react-icons/hi";
import MenuComponent from "../../../components/ui/Menu";
import { useState } from "react";
import { openDialog, closeDialog } from "../../../App/features/globalSlice";
import SearchQuery from "../../../components/SearchQuery";
import NoResult from "../../../components/ui/NoResult";
import Error from "../../../components/Error/Error";
import TableSkeleton from "../../../components/ui/TableSkeleton";
import MButton from "../../../components/ui/Button";
import { Link } from "react-router";
import DialogAlert from "../../../components/ui/Dialog";
import { toaster } from "../../../components/ui/toaster";
import { setPage } from "../../../App/features/paginationSlice";
import { useDeleteCategoryMutation, useGetDashboardCategoriesQuery } from "../../../App/services/createCategoryApi";

const CategoriesDashboard = () => {
  const [value, setValue] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const [
    deleteCategory,
    { isLoading: isDeletingCategory, isSuccess: isCategoryDeleted },
  ] = useDeleteCategoryMutation();
  const documentId = useAppSelector((state) => state.global.id);
  const { page, pageSize } = useAppSelector((state) => state.pagination);
  //! get data RTX Query =
  const { data, isLoading, isError, isFetching } =
    useGetDashboardCategoriesQuery(
      {
        page,
        pageSize,
        valueSort: value,
        query: searchQuery,
      },
      {
        refetchOnMountOrArgChange: false,
      }
    );

  const handleOpenDialog = (id: string) => {
    dispatch(openDialog(id));
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(documentId as string).unwrap();
      console.log("data", result);
      //? Toaster
      if (isCategoryDeleted) {
        toaster.success({
          title: "Category Deleted",
          description: "Category deleted successfully",
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

  //! Render
  const renderTableHeaders = tableCategoryColumns.map((header) => (
    <Table.ColumnHeader key={header.key} color={"gray.500"}>
      {header.label}
    </Table.ColumnHeader>
  ));

  const renderTableRows = data?.data.map((category: any) => (
    <Table.Row key={category.id}>
      <Table.Cell>
        <Image
          loading="lazy"
          src={`${import.meta.env.VITE_BASE_URL}${category.thumbnail?.url}`}
          alt={category.title}
          w={50}
          h={50}
        />
      </Table.Cell>
      <Table.Cell>{category.id}</Table.Cell>
      <Table.Cell>{category.title}</Table.Cell>

      <Table.Cell>
        <HStack>
          <Link to={`/dashboard/categories/create/${category.documentId}`}>
            <IconButton aria-label="Edit" variant="ghost" colorScheme="blue">
              <TbEdit />
            </IconButton>
          </Link>
          <IconButton
            onClick={() => handleOpenDialog(category.documentId)}
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
          <MainTitle title="Categories" isArrow={false} />
          <Link to="/dashboard/categories/create">
            <MButton
              variant="solid"
              colorScheme="teal"
              bg={"teal.500"}
              _hover={{ bg: "teal.600" }}
              size="md"
              title="Add Category"
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
      {/* Dialog Alert */}
      <DialogAlert
        title="Delete Category"
        action="Yes, Delete"
        onConfirm={handleDeleteCategory}
        loading={isDeletingCategory}
      >
        <Text fontSize={"md"}>
          Are you sure you want to delete this category?
        </Text>
      </DialogAlert>
    </>
  );
};

export default CategoriesDashboard;
