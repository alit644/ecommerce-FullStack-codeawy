import { Table } from "@chakra-ui/react";
interface ITableHeaders {
 columns: { key: string; label: string }[];

}
const TableHeaders = ({columns}: ITableHeaders) => {
  return (
    <>
      {columns.map((header) => (
        <Table.ColumnHeader key={header.key} color={"gray.500"}>
          {header.label}
        </Table.ColumnHeader>
      ))}
    </>
  );
};

export default TableHeaders;
