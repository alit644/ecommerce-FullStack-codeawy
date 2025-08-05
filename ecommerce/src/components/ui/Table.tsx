import { Table } from "@chakra-ui/react";
import type { ReactNode } from "react";
interface ITable {
  headers: ReactNode;
  rows: ReactNode;
}
const TableComponent = ({ headers, rows }: ITable) => {
  return (
      <Table.ScrollArea maxW="100%" overflow="auto">
        <Table.Root
          interactive
          rounded={"md"}
          border="1px solid #e4e4e7"
          p={2}
          size="md"
          mt={6}
        >
          <Table.Header>
            <Table.Row>{headers}</Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table.Root>
      </Table.ScrollArea>
  );
};

export default TableComponent;
