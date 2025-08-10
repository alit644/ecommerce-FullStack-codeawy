import NoResult from "../NoResult";
import TableSkeleton from "../TableSkeleton";
import PageLoader from "../PageLoader";
import { Flex, Box } from "@chakra-ui/react";
import TableHeaders from "./TableHeaders";
import TableComponent from "../Table";
import PaginationComponent from "../Pagination";

interface ITableWrapper {
  data: any[];
  isLoading: boolean;
  isFetching: boolean;
  columns: { key: string; label: string }[];
  rows: React.ReactNode;
  count: number;
  pageSize: number;
  page: number;
}
const TableWrapper = ({
  data,
  isLoading,
  isFetching,
  columns,
  rows,
  count,
  pageSize,
  page,
}: ITableWrapper) => {
  return (
    <Box position="relative">
      {!isLoading && !isFetching && data?.length === 0 ? (
        <NoResult />
      ) : isLoading ? (
        <TableSkeleton />
      ) : (
        <TableComponent
          headers={<TableHeaders columns={columns} />}
          rows={rows}
        />
      )}
      {isFetching && (
        <Flex
          position="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
          bg="rgba(255,255,255,0.6)"
          justifyContent="center"
          alignItems="center"
        >
          <PageLoader />
        </Flex>
      )}
      {/* Pagination */}
      {count !== undefined && count > 0 && (
        <PaginationComponent
          count={count || 0}
          pageSize={pageSize}
          page={page}
        />
      )}
    </Box>
  );
};

export default TableWrapper;
