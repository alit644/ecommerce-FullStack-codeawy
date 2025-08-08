import { Box, Text, VStack, Badge, HStack, Table } from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import ItemDetailsCard from "../../../components/ui/itemDetailsCard";
import CustomerInfo from "../../../components/orders/CustomerInfo";
import OrderItemsTable from "../../../components/orders/OrderItemsTable";
import CustomerInformationCard from "../../../components/ui/CustomerInformationCard";
import { useParams } from "react-router";
import { useGetOrderByIdQuery } from "../../../App/services/createOrderApi";

const OrderDetails = () => {
  const { documentId } = useParams();
  const { data: orderData, isLoading, isError } = useGetOrderByIdQuery(documentId as string);
  const order = orderData?.data;
   const orderItems = order?.items.map((item) => ({product: item.product , quantity: item.quantity}));
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !orderData) {
    return <div>Error loading order</div>;
  }


  //! Render

  const renderTableRows = orderItems?.map((item) => (
    <Table.Row key={item?.product?.id}> 
      <Table.Cell>{item?.product?.id}</Table.Cell>
      <Table.Cell>
        <ItemDetailsCard product={item.product} />
      </Table.Cell>
      <Table.Cell>{item.quantity}</Table.Cell>
      <Table.Cell>{item.product.price} $</Table.Cell>
      <Table.Cell fontWeight={"bold"} fontSize={"md"}>
        {item.product.price * item.quantity} $
      </Table.Cell>
    </Table.Row>
  ));

  //TODO: add skeleton 
  //TODO: PUT update order status 
  return (
    <Box>
      <VStack alignItems={"start"}>
        <HStack alignItems={"center"} gap={2}>
          <MainTitle title={`Order ID : #${order?.id}`} isArrow={false} />
          <Badge colorPalette={order?.statuss === "pending"
              ? "red"
              : order?.statuss === "shipped"
              ? "blue"
              : order?.statuss === "delivered"
              ? "green"
              : "orange"}>
            {order?.statuss}
          </Badge>
        </HStack>
        <Text fontSize={"sm"} color={"gray.500"}>
          Order Created At : {order?.createdAt?.split("T")[0]}
        </Text>
      </VStack>
      {/* Customer Info */}
      {order?.user && (
        <CustomerInfo
          user={order.user}
          statuss={order.statuss}
          updatedAt={order.updatedAt || ""}
          address={order.address}
        />
      )}
      {/* order Items And Totla */}
      <OrderItemsTable rows={renderTableRows} />

      {/* Total */}
      <Box mt={6} textAlign="right" maxW="400px" ml="auto">
        <CustomerInformationCard value={order?.totalPrice?.toString() || ""} lable="Sub Total:" />
        <CustomerInformationCard value="No Discount" lable="Discount:" />

        <HStack
          justifyContent="space-between"
          fontWeight="bold"
          fontSize="lg"
          borderTop="1px solid"
          borderColor="gray.200"
          pt={2}
        >
          <Text>Total:</Text>
          <Text fontWeight="bold" fontSize="lg" color={"teal.500"}>
            {order?.totalPrice?.toString() || ""} $
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default OrderDetails;
