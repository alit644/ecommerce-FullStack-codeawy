import { IconButton, HStack, Image, Table } from "@chakra-ui/react";
import type { IOrder } from "../../interfaces";
import { Link } from "react-router";
import { TbFileSearch } from "react-icons/tb";
import MBadge from "./MBadge";

const OrdersTableRows = ({ data }: { data: IOrder[] }) => {
  return (
    <>
      {data?.map((order) => {
        const images = order?.items?.map(
          (item) => item?.product?.thumbnail?.formats?.small?.url
        );

        return (
          <Table.Row key={order?.id}>
            <Table.Cell>{order?.id}</Table.Cell>
            <Table.Cell>
              <Image
                w={"50px"}
                h={"60px"}
                src={`${import.meta.env.VITE_BASE_URL}${images?.[0]}`}
              />
            </Table.Cell>
            <Table.Cell>{order?.createdAt?.split("T")[0]}</Table.Cell>
            <Table.Cell>
              <MBadge status={order?.statuss || ""} />
            </Table.Cell>
            <Table.Cell>{order?.items?.length}</Table.Cell>
            <Table.Cell>{order?.totalPrice}</Table.Cell>
            <Table.Cell>
              <HStack>
                <Link to={`/profile/orders/order-details/${order?.documentId}`}>
                  <IconButton
                    aria-label="View Order"
                    variant="ghost"
                    colorScheme="blue"
                  >
                    <TbFileSearch />
                  </IconButton>
                </Link>
              </HStack>
            </Table.Cell>
          </Table.Row>
        );
      })}
    </>
  );
};

export default OrdersTableRows;
