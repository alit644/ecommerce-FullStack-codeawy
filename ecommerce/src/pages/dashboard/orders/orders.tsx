import { Box, Table, Flex, HStack, IconButton } from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import { tableOrderColumns } from "../../../data";
import { useAppSelector } from "../../../App/store";
import { useState } from "react";
import SearchQuery from "../../../components/SearchQuery";
import Error from "../../../components/Error/Error";
import { useGetDashboardOrdersQuery } from "../../../App/services/createOrderApi";
import type { IOrder } from "../../../interfaces";
import { TbFileSearch } from "react-icons/tb";
import { Link } from "react-router";
import SortMenu from "../../../components/ui/SortMenu";
import TablePagination from "../../../components/ui/Table/TablePagination";
import MBadge from "../../../components/ui/MBadge";

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

  const renderTableRows = data?.data.map((order: IOrder) => (
    <Table.Row key={order.id}>
      <Table.Cell>{order.id}</Table.Cell>
      <Table.Cell>21Hnxs</Table.Cell>
      <Table.Cell>{order.createdAt.split("T")[0]}</Table.Cell>
      <Table.Cell>
        <MBadge status={order.statuss}/>
      </Table.Cell>
      <Table.Cell> {order.totalPrice}</Table.Cell>
      <Table.Cell>{order.items.length}</Table.Cell>
      <Table.Cell>{order.user.email}</Table.Cell>

      <Table.Cell>
        <HStack>
          <Link to={`/dashboard/orders/${order.documentId}`}>
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
            <SortMenu value={value} setValue={setValue} />
          </Flex>
          {/* Table */}

          <TablePagination
            data={data?.data || []}
            isLoading={isLoading}
            isFetching={isFetching}
            columns={tableOrderColumns}
            rows={renderTableRows}
            count={data?.meta.pagination.total || 0}
            pageSize={pageSize}
            page={page}
          />
        </Box>
      </Box>
    </>
  );
};

export default Orders;
