import { Box, Text, VStack, HStack, Table } from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import ItemDetailsCard from "../../../components/ui/itemDetailsCard";
import CustomerInfo from "../../../components/orders/CustomerInfo";
import OrderItemsTable from "../../../components/orders/OrderItemsTable";
import { useParams } from "react-router";
import { useGetOrderByIdQuery } from "../../../App/services/createOrderApi";
import TotalPrice from "../../../components/ui/TotalPrice";
import MBadge from "../../../components/ui/MBadge";
import PageLoader from "../../../components/ui/PageLoader";
import Error from "../../../components/Error/Error";

const OrderDetails = ({context}: {context: string}) => {
  const { documentId } = useParams();
  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(documentId as string);
  const order = orderData?.data;
  const orderItems = order?.items.map((item) => ({
    product: item.product,
    quantity: item.quantity,
  }));
  if (isLoading) {
    return <PageLoader />
  }

  if (isError || !orderData) {
    return <Error status={500} message="Server error. Please try again later." height="100vh" />
  }

  //! Render

  const renderTableRows = orderItems?.map((item) => (
    <Table.Row key={item?.product?.id}>
      <Table.Cell>{item?.product?.id}</Table.Cell>
      <Table.Cell minW="400px" w="400px">
        <ItemDetailsCard product={item.product} />
      </Table.Cell>
      <Table.Cell>{item?.quantity}</Table.Cell>
      <Table.Cell>{item?.product?.price} $</Table.Cell>
      <Table.Cell fontWeight={"bold"} fontSize={"md"}>
        {item?.product?.price * item?.quantity} $
      </Table.Cell>
    </Table.Row>
  ));

  //TODO: add skeleton
  return (
    <Box>
      <VStack alignItems={"start"}>
        <HStack alignItems={"center"} gap={2}>
          <MainTitle title={`Order ID : #${order?.id}`} isArrow={false} />
          <MBadge status={order?.statuss || ""} />
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
          context={context}
        />
      )}
      {/* order Items And Totla */}
      <OrderItemsTable rows={renderTableRows} />

      {/* TotalPrice */}
      <TotalPrice
        totalPrice={order?.totalPrice || 0}
        discount={order?.address?.discount || 0}
      />
    </Box>
  );
};

export default OrderDetails;
