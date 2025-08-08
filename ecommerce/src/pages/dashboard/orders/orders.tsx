import {
  Box,
  Table,
  Flex,
  Menu,
  HStack,
  IconButton,
  Badge,
  Image,
} from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import { sortItems, tableOrderColumns } from "../../../data";
import TableComponent from "../../../components/ui/Table";
import PaginationComponent from "../../../components/ui/Pagination";
import { useAppSelector } from "../../../App/store";
import { HiSortAscending } from "react-icons/hi";
import MenuComponent from "../../../components/ui/Menu";
import { useState } from "react";
import SearchQuery from "../../../components/SearchQuery";
import NoResult from "../../../components/ui/NoResult";
import Error from "../../../components/Error/Error";
import TableSkeleton from "../../../components/ui/TableSkeleton";
import { useGetDashboardOrdersQuery } from "../../../App/services/createOrderApi";
import type { IOrder } from "../../../interfaces";
import { TbFileSearch } from "react-icons/tb";
import { Link } from "react-router";

const Orders = () => {
  const [value, setValue] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const { page, pageSize } = useAppSelector((state) => state.pagination);

  //! get data RTX Query =
  const { data, isLoading, isError, isFetching } = useGetDashboardOrdersQuery(
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
  console.log(data?.data)

  //! Render
  const renderTableHeaders = tableOrderColumns.map((header) => (
    <Table.ColumnHeader key={header.key} color={"gray.500"}>
      {header.label}
    </Table.ColumnHeader>
  ));

  const renderTableRows = data?.data.map((order: IOrder) => (
    <Table.Row key={order.id}>
      <Table.Cell>
        <Image
          loading="lazy"
          src={`${import.meta.env.VITE_BASE_URL}${
            order.items[0].product.thumbnail?.formats.small.url
          }`}
          alt={order.items[0].product.title}
          borderRadius="md"
          w={"50px"}
          h={"50px"}
        />
      </Table.Cell>
      <Table.Cell>{order.id}</Table.Cell>
      <Table.Cell>{order.createdAt.split("T")[0]}</Table.Cell>
      <Table.Cell>
        <Badge
          colorPalette={
            order.statuss === "pending"
              ? "red"
              : order.statuss === "shipped "
              ? "blue"
              : order.statuss === "delivered"
              ? "green"
              : "orange"
          }
        >
          {order.statuss}
        </Badge>
      </Table.Cell>
      <Table.Cell> {order.totalPrice}</Table.Cell>
      <Table.Cell>{order.items.length}</Table.Cell>
      <Table.Cell>{order.user.email}</Table.Cell>

      <Table.Cell>
        <HStack>
          <Link to={`/dashboard/orders/${order.id}`}>
            <IconButton aria-label="Edit" variant="ghost" colorScheme="blue">
              <TbFileSearch />
            </IconButton>
          </Link>
        </HStack>
      </Table.Cell>
    </Table.Row>
  ));

  if (isError) return <Error description="Something went wrong" />;

  return (
    <>
      <Box>
        <Flex
          direction={"row"}
          alignItems="center"
          w={"full"}
          justifyContent="space-between"
        >
          <MainTitle title="Orders" isArrow={false} />
        </Flex>
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
    </>
  );
};

export default Orders;
