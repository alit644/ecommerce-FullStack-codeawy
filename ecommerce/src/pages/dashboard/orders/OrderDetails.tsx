import {
  Box,
  Text,
  VStack,
  Badge,
  HStack,
  Heading,
  Table,
} from "@chakra-ui/react";
import MainTitle from "../../../components/MainTitle";
import ItemDetailsCard from "../../../components/ui/itemDetailsCard";
import CustomerInfo from "../../../components/orders/CustomerInfo";
import OrderItemsTable from "../../../components/orders/OrderItemsTable";
import CustomerInformationCard from "../../../components/ui/CustomerInformationCard";

const OrderDetails = () => {
  const steps = ["created", "pending", "confirmed", "shipped", "delivered"];
  const currentStep = steps.indexOf("created");
  const progressValue = ((currentStep + 1) / steps.length) * 100;

  //! Render

  const renderTableRows = () => (
    <Table.Row>
      <Table.Cell>21saCD</Table.Cell>
      <Table.Cell>
        <ItemDetailsCard />
      </Table.Cell>
      <Table.Cell>2</Table.Cell>
      <Table.Cell>2</Table.Cell>
      <Table.Cell fontWeight={"bold"} fontSize={"md"}>
        3223 $
      </Table.Cell>
    </Table.Row>
  );
  return (
    <Box>
      <VStack alignItems={"start"}>
        <HStack alignItems={"center"} gap={2}>
          <MainTitle title="Order ID : #21Der" isArrow={false} />
          <Badge colorPalette="red">Pending</Badge>
        </HStack>
        <Text fontSize={"sm"} color={"gray.500"}>
          Order Created At : 2022-01-01
        </Text>
      </VStack>
      {/* Customer Info */}
      <CustomerInfo />
      {/* order Items And Totla */}
      <OrderItemsTable rows={renderTableRows()} />

      {/* Total */}
      <Box mt={6} textAlign="right" maxW="400px" ml="auto">
        <CustomerInformationCard value="2132 $" lable="Sub Total:" />
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
            3223 $
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default OrderDetails;
