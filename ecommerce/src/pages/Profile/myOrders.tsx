import { Box, Flex } from "@chakra-ui/react";
import MainTitle from "../../components/MainTitle";
import { useAppSelector } from "../../App/store";
import { useState } from "react";
import SearchQuery from "../../components/SearchQuery";
import Error from "../../components/Error/Error";
import { useGetUserOrdersQuery } from "../../App/services/createOrderApi";
import type { IUserInfo } from "../../interfaces";
import cookieManager from "../../utils/cookieManager";
import SortMenu from "../../components/ui/SortMenu";
import { tableOrderUserColumns } from "../../data";
import TablePagination from "../../components/ui/Table/TablePagination";
import OrdersTableRows from "../../components/ui/TableRows";

const Profile = () => {
  const [value, setValue] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const userID = cookieManager.get<IUserInfo>("user")?.id;
  const { page, pageSize } = useAppSelector((state) => state.pagination);

  //! get data RTX Query =
  const { data, isLoading, isError, isFetching } = useGetUserOrdersQuery(
    {
      page,
      pageSize,
      valueSort: value,
      query: searchQuery,
      userID: userID || 1,
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  if (isError) return <Error description="Something went wrong" />;

  return (
    <>
      <Box position="relative">
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
            columns={tableOrderUserColumns}
            rows={<OrdersTableRows data={data?.data || []} />}
            count={data?.meta.pagination.total || 0}
            pageSize={pageSize}
            page={page}
          />
        </Box>
      </Box>
    </>
  );
};

export default Profile;
