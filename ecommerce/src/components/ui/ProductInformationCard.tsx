import { Box, Text } from "@chakra-ui/react";
interface IProductInformationCard {
  label: string;
  value: string | number | string[];
}
const ProductInformationCard = ({ label, value }: IProductInformationCard) => {
  return (
    <Box
      p={2}
      _hover={{
        bg: "blue.100",
        border: "1px solid blue",
        transition: "all 0.3s ease",
      }}
      w={"45%"}
      borderRadius="lg"
      boxShadow="sm"
      border="1px solid #ccc"
      bg="white"
    >
      <Text fontSize="lg" color="gray.800" fontWeight="semibold">
        {label} :
      </Text>
      <Text fontSize="md" color="gray.600">
        {value}
      </Text>
    </Box>
  );
};

export default ProductInformationCard;
