import { Box, Square, Text, HStack } from "@chakra-ui/react";

const RecentProductsCard = () => {
  return (
    <HStack
      mb={3}
      w={"full"}
      alignItems="center"
      justifyContent="space-between"
      p={4}
      border="1px solid #e4e4e7"
      borderRadius="md"
    >
      {/* Image and Name */}
      <HStack>
        <Square size="16" rounded="md" bg="gray.300" color="white" />
        <Box>
          <Text fontSize={{ base: "md", lg: "lg" }} fontWeight="medium" color="gray.700">
            Wireless Headphones
          </Text>
          <Text fontSize="md" color="gray.500">
            Electronics
          </Text>
        </Box>
      </HStack>
      {/* price and Created At */}
      <Box>
        <Text textAlign={"right"} fontSize="md" fontWeight="bold" color="gray.700">
          $199.99
        </Text>
        <Text textAlign={"right"} fontSize="md" color="gray.500">
          2 days ago
        </Text>
      </Box>
    </HStack>
  );
};

export default RecentProductsCard;
