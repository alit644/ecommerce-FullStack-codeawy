import { Box, HStack, Text } from "@chakra-ui/react";
import CustomerInformationCard from "./CustomerInformationCard";
interface ITotalPrice {
  totalPrice: number;
  discount: number;
}
const TotalPrice = ({ totalPrice, discount }: ITotalPrice) => {
  return (
    <Box mt={6}>
      <CustomerInformationCard value={totalPrice.toString()} lable="Sub Total:" />
      <CustomerInformationCard value={discount.toString() === "0" ? "No Discount" : discount.toString()} lable="Discount:" />

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
          {totalPrice - discount} $
        </Text>
      </HStack>
    </Box>
  );
};

export default TotalPrice;
