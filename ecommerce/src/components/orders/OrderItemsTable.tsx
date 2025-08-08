import { Box, Heading, Table } from "@chakra-ui/react";
import TableComponent from "../ui/Table";
import { tableOrderItemsColumns } from "../../data";
import type { ReactNode } from "react";
interface IOrderItemsTable {
  rows: ReactNode;
}
const OrderItemsTable = ({ rows }: IOrderItemsTable) => {
  const renderTableHeaders = tableOrderItemsColumns.map((header) => (
    <Table.ColumnHeader key={header.key} color={"gray.500"}>
      {header.label}
    </Table.ColumnHeader>
  ));

  return (
    <Box mt={4} w={"full"} border={"1px solid #e4e4e7"} borderRadius="md" p={4}>
      <Heading
        as={"h2"}
        fontSize={"lg"}
        color={"gray.800"}
        fontWeight={"medium"}
      >
        Order Items
      </Heading>
      <TableComponent
        showColumnBorder={true}
        headers={renderTableHeaders}
        rows={rows}
      />
    </Box>
  );
};

export default OrderItemsTable;
