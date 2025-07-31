import { Center, VStack, Icon, Text } from "@chakra-ui/react";
import { FaBoxOpen } from "react-icons/fa";

const NoResult = () => {
  return (
    <Center h="200px">
      <VStack spaceY={4}>
        <Icon as={FaBoxOpen} boxSize={12} color="gray.300" />
        <Text fontSize="xl" fontWeight="bold" color="gray.600">
          No Products Found
        </Text>
        <Text color="gray.500">
          Try adjusting your filters or search criteria
        </Text>
      </VStack>
    </Center>
  );
};

export default NoResult;
