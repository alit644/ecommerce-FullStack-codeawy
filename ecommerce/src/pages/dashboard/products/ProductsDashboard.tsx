import {
  Box,
  Button,
  HStack,
  Image,
  Table,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import { LuTrash2 } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { BsPlus } from "react-icons/bs";
import { tableColumns } from "../../../data";
import TableComponent from "../../../components/ui/Table";
import { useFetching } from "../../../Hooks/useFetching";
import { fetchProducts } from "../../../utils/fetchingData";
import type { IProductCard } from "../../../interfaces";
interface IRenderTableRows {
  data: IProductCard[];
  meta: {
    pagination: {
      page?: number;
      pageSize?: number;
      total?: number;
    };
  };
}
//TODO: Add Search Functionality
//TODO: Add Pagination
//TODO: Add Filter Functionality
//TODO: Add Skeleton Loader 
const ProductsDashboard = () => {
  //! Get Data
  const { data, isLoading, error } = useFetching<IRenderTableRows>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(1, 5, ""),
  });

  //! Render
  const renderTableHeaders = () => {
    return tableColumns.map((header) => (
      <Table.ColumnHeader key={header.key} color={"gray.500"}>
        {header.label}
      </Table.ColumnHeader>
    ));
  };

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
        <Badge colorScheme="green">Active</Badge>
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
  if (error) return <div>Error</div>;
  return (
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
      {/* Table */}
      <TableComponent headers={renderTableHeaders()} rows={renderTableRows} />
    </Box>
  );
};

export default ProductsDashboard;
