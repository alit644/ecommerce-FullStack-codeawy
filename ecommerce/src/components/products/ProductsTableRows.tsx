import { IconButton, HStack, Badge, Image, Table } from "@chakra-ui/react";
import type { IProductCard } from "../../interfaces";
import { Link } from "react-router";
import { TbEdit } from "react-icons/tb";
import { LuTrash2 } from "react-icons/lu";
import { useAppDispatch } from "../../App/store";
import { openDialog } from "../../App/features/globalSlice";

const ProductsTableRows = ({ data }: { data: IProductCard[] }) => {
 const dispatch = useAppDispatch();
 const handleOpenDialog = (id: string) => {
  dispatch(openDialog(id));
};
  return (
    <>
      {data.map((product: IProductCard) => (
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
                product.stock !== undefined && product.stock > 0
                  ? "green"
                  : "red"
              }
            >
              {product.stock !== undefined && product.stock > 0
                ? "Active"
                : "Out of Stock"}
            </Badge>
          </Table.Cell>
          <Table.Cell>
            <HStack>
              <Link to={`/dashboard/products/create/${product.documentId}`}>
                <IconButton
                  aria-label="Edit"
                  variant="ghost"
                  colorScheme="blue"
                >
                  <TbEdit />
                </IconButton>
              </Link>
              <IconButton
                onClick={() => handleOpenDialog(product.documentId)}
                aria-label="Delete"
                variant="ghost"
                colorScheme="red"
              >
                <LuTrash2 />
              </IconButton>
            </HStack>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default ProductsTableRows;
